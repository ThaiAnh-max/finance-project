import React, { Component } from 'react';
import moment from 'moment';
import { Row, Col } from 'mdbreact';
import MyFinanceChart from '../../components/charts/MyFinanceChart';
import DateTimePicker from '../../components/datetime-picker/DateTimePicker';
import parseCSV from './parseCSV';
import finance from './finance';
import CompanySelect from '../../components/company-select/CompanySelect';


export default class extends Component {
  get chartComponent() {
    return this.chartRef.current;
  }

  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.handleDateRangeChange = this.handleDateRangeChange.bind(this);
    this.state = {
      start: '',
      end: ''
    };
  }

  handleDateRangeChange(start, end) {
    fetch('/finance.csv').then(async (res) => {
      const csvContent = await res.text();
      this.updateChart(csvContent, start, end);
    }).catch(() => {
      this.updateChart(finance, start, end);
    });
  }

  updateChart(csvContent, start, end) {
    const csv = parseCSV(csvContent);
    console.log(csv);

    // ["Date", "Open", "High", "Low", "Close"]
    const rows = csv.slice(1);
    const data = rows.map((row) => ({
      x: new Date(row[0]),
      y: row.slice(1).map((cell) => +cell)
    }))
      .filter((row) => moment(row.x).isBetween(start, end));

    this.chartComponent.chart.updateSeries([
      { name: '', data }
    ]);
  }

  render() {
    return (
      <div className="">
        <div>
          <Row>
            <Col>
              <CompanySelect className="m-3" />
            </Col>
            <Col>
              <DateTimePicker onChange={this.handleDateRangeChange} />
            </Col>
          </Row>
          <MyFinanceChart ref={this.chartRef} />
        </div>
      </div>
    );
  }
}
