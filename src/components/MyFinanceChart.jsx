import React from 'react';
import ReactApexChart from 'react-apexcharts';
import './MyFinanceChart.css';
import parseCSV from './parseCSV';
import finance from './finance';


export default class extends React.Component {
  get chart() {
    return this.chartRef.current.chart;
  }

  constructor(props) {
    super(props);

    this.chartRef = React.createRef();
    this.state = {
      series: [],
      options: {
        series: [],
        chart: {
          type: 'candlestick',
          height: 600
        },
        title: {
          text: 'Stock price',
          align: 'left'
        },
        xaxis: {
          type: 'datetime',
          format: 'dd/mm/yy'
        },
        yaxis: {
          tooltip: {
            enabled: true
          },
          labels: {
            formatter: val => val.toFixed(2)
          }
        }
      },
    };
  }

  componentDidMount() {
    fetch('/finance.csv').then(async (res) => {
      const csvContent = await res.text();
      this.updateChart(csvContent);
    }).catch(() => {
      this.updateChart(finance);
    });
  }

  updateChart(csvContent) {
    const csv = parseCSV(csvContent);
    console.log(csv);

    // ["Date", "Open", "High", "Low", "Close"]
    const rows = csv.slice(1);
    const data = rows.map(row => {
      return {
        x: new Date(row[0]),
        y: row.slice(1).map(cell => +cell)
      }
    })

    this.chart.updateSeries([
      { name: '', data: data },
    ]);
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          ref={this.chartRef}
          options={this.state.options}
          series={this.state.series}
          type="candlestick"
          height={700} />
      </div>
    );
  }
}