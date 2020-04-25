/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import {
  Row, Col, MDBTable, MDBTableBody, MDBTableHead, MDBInput, MDBBadge, MDBIcon
} from 'mdbreact';
import PortfolioChart from '../../components/charts/portfolio-chart/PortfolioChart';
import './PortfolioManagement.scss';


function isValidAsset(asset) {
  return asset.mean != null && asset.stdev != null && asset.corr != null;
}

export default class extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRemoveAsset = this.handleRemoveAsset.bind(this);
    this.state = {
      assets: [
        {
          mean: 0,
          stdev: 0,
          corr: 0
        }, {
          mean: 0,
          stdev: 0,
          corr: 0
        }
      ]
    };
  }

  handleInputChange(event) {
    const { name, value, dataset: { index } } = event.target;
    this.setState((prevState) => {
      const { assets } = prevState;
      if (+index >= assets.length) {
        assets.push({ mean: 0, stdev: 0, corr: 0 });
      }
      assets[+index][name] = value.replace(/[^\d-.]/g, '');
      return {
        assets
      };
    });
  }

  // eslint-disable-next-line class-methods-use-this
  renderInput(value, name, index) {
    return (
      <input
        value={value}
        name={name}
        data-index={index}
        onChange={this.handleInputChange}
        className="form-control"
      />
    );
  }

  handleRemoveAsset(event) {
    const { dataset: { index } } = event.target;
    this.setState((prevState) => {
      if (Number.isNaN(+index) || +index < 2) {
        return null;
      }
      const { assets } = prevState;
      assets.splice(+index, 1);
      return {
        assets
      };
    });
  }

  render() {
    const { assets } = this.state;

    return (
      <div>
        <Row>
          <Col>
            <div className="d-inline-block m-3">
              <MDBTable className="portfolio-table rounded white">
                <MDBTableHead>
                  <tr>
                    <th> </th>
                    {assets.map((asset, index) => (
                      <th key={index} className="text-center">
                        {isValidAsset(asset)
                          ? (
                            <span>
                              {`Asset ${index + 1}`}
                              <MDBBadge
                                color="danger"
                                className="d-inline-block ml-1 rounded-circle"
                                data-index={index}
                                onClick={this.handleRemoveAsset}
                                style={{ cursor: 'pointer' }}
                              >×
                              </MDBBadge>
                            </span>
                          ) : (
                            ''
                          )}
                      </th>
                    ))}
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  <tr>
                    <td><b>Mean</b></td>
                    {assets.map(({ mean }, index) => (
                      <td key={`mean-${index}`}>
                        {this.renderInput(mean, 'mean', index)}
                      </td>
                    ))}
                    <td>
                      {this.renderInput('', 'mean', assets.length)}
                    </td>
                  </tr>
                  <tr>
                    <td><b>Stdev</b></td>
                    {assets.map(({ stdev }, index) => (
                      <td key={`stdev-${index}`}>
                        {this.renderInput(stdev, 'stdev', index)}
                      </td>
                    ))}
                    <td>
                      {this.renderInput('', 'stdev', assets.length)}
                    </td>
                  </tr>
                  <tr>
                    <td><b>Corr</b></td>
                    {assets.map(({ corr }, index) => (
                      <td key={`corr-${index}`}>
                        {this.renderInput(corr, 'corr', index)}
                      </td>
                    ))}
                    <td>
                      {this.renderInput('', 'corr', assets.length)}
                    </td>
                  </tr>
                </MDBTableBody>
              </MDBTable>
            </div>
          </Col>
          <Col>
            <PortfolioChart />
          </Col>
        </Row>
      </div>
    );
  }
}
