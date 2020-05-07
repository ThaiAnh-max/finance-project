/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import {
  Row, Col
} from 'mdbreact';
import superagent from 'superagent';
import PortfolioChart from '../../components/charts/portfolio-chart/PortfolioChart';
import AssetsTable from './AssetsTable';
import './PortfolioManagement.scss';
import MinMaxW from './MinMaxW';
import financeData from './data';


function isValidAsset(asset) {
  return asset.mean != null && asset.stdev != null && asset.corr != null;
}

function computeMean(w, meanI, meanJ) {
  return w * meanI + (1 - w) * meanJ;
}

function computeStdev(w, stdevI, stdevJ, covariant) {
  const cov = stdevI * stdevJ * covariant;
  return Math.sqrt((w ** 2 * stdevI ** 2) + (2 * w * (1 - w) * cov) + ((1 - w) ** 2 * stdevJ ** 2));
}

export default class extends Component {
  get chart() {
    return this.chartRef.current;
  }

  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAnalyze = this.handleAnalyze.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.state = {
      minW: -0.5,
      maxW: 1.5,
      assets: [
        {
          mean: 20,
          stdev: 4,
          corr: 0.3
        }, {
          mean: 22,
          stdev: 5,
          corr: 0.3
        }, {
          mean: 24,
          stdev: 4,
          corr: -0.1
        }, {

        }
      ]
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { assets: rawAssets, minW, maxW } = this.state;
    const assets = rawAssets.filter((asset) => isValidAsset(asset));
    superagent.get('/data.csv')
      .query({
        assets,
        minW,
        maxW
      })
      .then((rs) => {
        const csvContent = rs.text;
        this.chart.updateChart(csvContent);
      })
      .catch(() => {
        this.chart.updateChart(financeData);
      });
  }

  handleInputChange(event) {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value
    });
  }

  handleAnalyze() {
    const { assets: rawAssets, minW, maxW } = this.state;
    const assets = rawAssets.filter((asset) => isValidAsset(asset));
    const numAssets = assets.length;

    const headers = [];
    for (let i = 0; i < numAssets; i++) {
      for (let j = i + 1; j < numAssets; j++) {
        headers.push(`mean${i + 1}${j + 1},stdev${i + 1}${j + 1}`);
      }
    }

    let rawCSV = `w,${headers.join(',')}\r\n`;

    for (let w = +minW; w <= +maxW; w += 0.01) {
      rawCSV += `${w},`;
      const meanStdevs = [];
      for (let i = 0; i < numAssets; i++) {
        for (let j = i + 1; j < numAssets; j++) {
          const mean = computeMean(w, +assets[i].mean, +assets[j].mean);
          const stdev = computeStdev(w, +assets[i].stdev, +assets[j].stdev, +assets[i].corr);
          meanStdevs.push(`${mean},${stdev}`);
        }
      }
      rawCSV += `${meanStdevs.join(',')}\r\n`;
    }
    this.chart.updateChart(rawCSV);
  }

  render() {
    const { assets, minW, maxW } = this.state;

    return (
      <div>
        <Row>
          <Col>
            <div className="d-inline-block m-3">
              <AssetsTable
                name="assets"
                value={assets}
                onChange={this.handleInputChange}
              />
              <div className="d-flex">
                <MinMaxW
                  min={minW}
                  max={maxW}
                  onChange={this.handleInputChange}
                  onAnalyze={this.handleAnalyze}
                />
              </div>
            </div>
          </Col>
          <Col>
            <PortfolioChart ref={this.chartRef} />
          </Col>
        </Row>
      </div>
    );
  }
}
