import React, { Component } from 'react';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';

const demoOptions = [
  { value: 'Microsoft', label: 'Microsoft' },
  { value: 'Google', label: 'Google' },
  { value: 'Apple', label: 'Apple' }
];

export default class extends Component {
  render() {
    const { className, options } = this.props;
    return (
      <>
        <Select
          className={className}
          options={options || demoOptions}
          component={makeAnimated}
        />
      </>
    );
  }
}
