import React, { Component } from 'react';
import {
  MDBTable, MDBTableHead, MDBTableBody
} from 'mdbreact';

function isValidAsset(asset) {
  return asset.mean != null && asset.stdev != null;
}

export default class extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAnalyze = this.handleAnalyze.bind(this);
    this.state = {
      corr: props.value
    };
  }

  handleInputChange(event) {
    const { target: { name, value } } = event;
    this.setState((prevState) => {
      prevState.corr[+name.split('_')[0]] = value;
      return {
        corr: prevState.corr
      };
    }, () => {
      if (this.props.onChange) {
        this.props.onChange({
          target: {
            name,
            value: this.state.corr
          }
        });
      }
    });
  }

  handleAnalyze() {
    if (this.props.onAnalyze) {
      this.props.onAnalyze();
    }
  }

  render() {
    const { assets } = this.props;
    const numAssets = assets.filter((asset) => isValidAsset(asset)).length;
    const corrKeys = [];
    for (let i = 0, counter = 0; i < numAssets - 1; i++) {
      for (let j = i + 1; j < numAssets; j++, counter++) {
        corrKeys.push(`${counter}_Corr ${i + 1}${j + 1}`);
      }
    }
    const { corr = this.state.corr } = this.props;

    return (
      <MDBTable className="corr-table rounded white">
        <MDBTableHead>
          <tr>
            {corrKeys.map((key) => (
              <th key={key}>{key.split('_')[1]}</th>
            ))}
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          <tr>
            {corrKeys.map((key, index) => (
              <td>
                <input
                  name={key}
                  value={corr[index]}
                  onChange={this.handleInputChange}
                  className="form-control"
                />
              </td>
            ))}
          </tr>
        </MDBTableBody>
      </MDBTable>
    );
  }
}
