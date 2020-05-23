import React, { Component } from 'react';
import moment from 'moment';
import { Row, Col } from 'mdbreact';
import unirest from 'unirest';
import MyFinanceChart from '../../components/charts/MyFinanceChart';
import parseCSV from './parseCSV';
import finance from './finance';
import CompanySelect from '../../components/company-select/CompanySelect';
import DateTimePicker from '../../components/datetime-picker/DateTimePicker';


export default class extends Component {
  get chartComponent() {
    return this.chartRef.current;
  }

  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.handleCompanyChange = this.handleCompanyChange.bind(this);
    this.handleDateRangeChange = this.handleDateRangeChange.bind(this);
    this.state = {
      company: '',
      start: '2019/1/1',
      end: '2019/5/1'
    };
  }

  handleDateRangeChange(startRange, endRange) {
    this.setState({
      start: startRange,
      end: endRange
    }, () => {
      const { company, start, end } = this.state;
      this.fetchOnlineData({ company, start, end });
    });
  }

  handleCompanyChange(selectedCompany) {
    this.setState({
      company: selectedCompany.value
    }, () => {
      const { company, start, end } = this.state;
      this.fetchOnlineData({ company, start, end });
    });
  }

  fetchOnlineData({ company, start, end }) {
    const req = unirest('GET', 'https://finnhub-realtime-stock-price.p.rapidapi.com/stock/candle');

    console.log(start, end);
    req.query({
      symbol: company,
      from: new Date(start).getTime() / 1000,
      to: new Date(end).getTime() / 1000,
      resolution: 'D'
    });

    req.headers({
      'x-rapidapi-host': 'finnhub-realtime-stock-price.p.rapidapi.com',
      'x-rapidapi-key': 'afa8908cd3mshe6b80263496b934p155993jsn9a2c2f3bbe0d',
      useQueryString: true
    });


    req.end((res) => {
      if (res.error) {
        return;
      }

      const data = this.resolveOnlineData(res.body);
      this.updateChart(data);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  resolveOnlineData(data) {
    const {
      t: times, o: open, h: high, l: low, c: close
    } = data;
    return times.map((time, i) => ({
      x: new Date(time),
      y: [open[i], high[i], low[i], close[i]]
    }));
  }

  fetchChartData({ company, start, end }) {
    fetch(`/${company}.csv`).then(async (res) => {
      const csvContent = await res.text();
      this.updateChart(csvContent, start, end);
    }).catch(() => {
      this.updateChart(finance, start, end);
    });
  }

  resolveLocalData(csvContent, start, end) {
    const csv = parseCSV(csvContent);
    console.log(csv);

    // ["Date", "Open", "High", "Low", "Close"]
    const rows = csv.slice(1);
    const data = rows.map((row) => ({
      x: new Date(row[0]),
      y: row.slice(1).map((cell) => +cell)
    }))
      .filter((row) => moment(row.x).isBetween(start, end));

    this.updateChart(data);
  }

  updateChart(data) {
    this.chartComponent.chart.updateSeries([
      { name: '', data }
    ]);
  }

  render() {
    const { start, end } = this.state;
    return (
      <div className="">
        <div>
          <Row>
            <Col>
              <CompanySelect
                className="m-3"
                onChange={this.handleCompanyChange}
              />
            </Col>
            <Col>
              <DateTimePicker
                start={start}
                end={end}
                onChange={this.handleDateRangeChange}
              />
            </Col>
          </Row>
          <MyFinanceChart ref={this.chartRef} />
        </div>
      </div>
    );
  }
}
