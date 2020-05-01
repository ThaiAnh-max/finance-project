/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import './CompanySelect.scss';

const demoOptions = [
  { value: 'microsoft', label: 'Microsoft' },
  { value: 'google', label: 'Google' },
  { value: 'apple', label: 'Apple' }
];


export default class extends Component {
  render() {
    const { className, options, ...restProps } = this.props;
    return (
      <>
        <div className="text white">Select company</div>
        <Select
          className={className}
          options={options || demoOptions}
          component={makeAnimated}
          {...restProps}
        />
      </>
    );
  }
}
