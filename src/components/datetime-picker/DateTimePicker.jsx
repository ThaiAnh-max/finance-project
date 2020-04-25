/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  FormControl, Grid, Row, Col
} from 'react-bootstrap';
import moment from 'moment';
import DateTimeRangeContainer from 'react-advanced-datetimerange-picker';


export default class extends React.Component {
  constructor(props) {
    super(props);
    const start = moment(new Date(2019, 3, 31, 0, 0, 0, 0));
    const end = moment(start)
      .add(5, 'days')
      .subtract(1, 'second');
    this.state = {
      start,
      end
    };

    this.onClick = this.onClick.bind(this);
    this.applyCallback = this.applyCallback.bind(this);
  }

  applyCallback(startDate, endDate) {
    console.log('Apply Callback');
    console.log(startDate.format('DD-MM-YYYY HH:mm'));
    console.log(endDate.format('DD-MM-YYYY HH:mm'));
    this.setState({
      start: startDate,
      end: endDate
    }, () => {
      const { start, end } = this.state;
      if (this.props.onChange) {
        this.props.onChange(start, end);
      }
    });
  }

  rangeCallback(index, value) {
    console.log(index, value);
  }

  onClick() {
    const newStart = moment(this.state.start).subtract(3, 'days');
    // console.log("On Click Callback");
    // console.log(newStart.format("DD-MM-YYYY HH:mm"));
    this.setState({ start: newStart });
  }

  renderStandalone(ranges, local, maxDate, descendingYears) {
    return (
      <div id="DateTimeRangeContainerStandalone" className="p-3">
        <p>
          {' '}
          <b>Standalone</b> DateTime picker. Values are{' '}
          {this.state.start.format('DD-MM-YYYY HH:mm')} and{' '}
          {this.state.end.format('DD-MM-YYYY HH:mm')}{' '}
        </p>
        <DateTimeRangeContainer
          ranges={ranges}
          start={this.state.start}
          end={this.state.end}
          local={local}
          maxDate={maxDate}
          applyCallback={this.applyCallback}
          rangeCallback={this.rangeCallback}
          autoApply
          descendingYears={descendingYears}
          years={[2010, 2030]}
          standalone
          style={{
            standaloneLayout: { display: 'flex', maxWidth: 'fit-content' }
          }}
        />
      </div>
    );
  }

  render() {
    const now = new Date();
    const start = moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    );
    const end = moment(start)
      .add(1, 'days')
      .subtract(1, 'seconds');
    const ranges = {
      'Today Only': [moment(start), moment(end)],
      'Yesterday Only': [
        moment(start).subtract(1, 'days'),
        moment(end).subtract(1, 'days')
      ],
      '3 Days': [moment(start).subtract(3, 'days'), moment(end)],
      '5 Days': [moment(start).subtract(5, 'days'), moment(end)],
      '1 Week': [moment(start).subtract(7, 'days'), moment(end)],
      '2 Weeks': [moment(start).subtract(14, 'days'), moment(end)],
      '1 Month': [moment(start).subtract(1, 'months'), moment(end)],
      '1st August 18': [
        moment('2018-08-01 00:00:00'),
        moment('2018-08-02 23:59:59')
      ],
      '1 Year': [moment(start).subtract(1, 'years'), moment(end)]
    };
    const local = {
      format: 'DD-MM-YYYY HH:mm',
      sundayFirst: false
    };
    const maxDate = moment(end).add(24, 'hour');
    return (
      <div className="card d-inline-block my-3">
        {this.renderStandalone(ranges, local, maxDate, false)}
      </div>
    );
  }
}
