import React from 'react';
import ReactApexChart from 'react-apexcharts';
import './MyFinanceChart.css';


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
            formatter: (val) => val.toFixed(2)
          }
        }
      }
    };
  }

  render() {
    return (
      <div className="px-2 py-3">
        <ReactApexChart
          ref={this.chartRef}
          options={this.state.options}
          series={this.state.series}
          type="candlestick"
          height={700}
        />
      </div>
    );
  }
}
