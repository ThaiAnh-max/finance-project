import React, { Component } from 'react';
import {
  MDBTable, MDBTableHead, MDBTableBody, MDBBtn
} from 'mdbreact';

export default class extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAnalyze = this.handleAnalyze.bind(this);
    this.state = {
      minW: props.min || -0.5,
      maxW: props.max || 1.5
    };
  }

  handleInputChange(event) {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value
    }, () => {
      if (this.props.onChange) {
        this.props.onChange({
          target: {
            name,
            value
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
    const { minW, maxW } = this.state;

    return (
      <MDBTable className="min-max-table rounded white ">
        <MDBTableHead>
          <tr>
            <th> </th>
            <th>Min</th>
            <th>Max</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          <tr>
            <td><b>w</b></td>
            <td>
              <input
                value={minW}
                name="minW"
                onChange={this.handleInputChange}
                className="form-control"
              />
            </td>
            <td>
              <input
                value={maxW}
                name="maxW"
                onChange={this.handleInputChange}
                className="form-control"
              />
            </td>
          </tr>
          <tr>
            <td className="text-right" colSpan="3">
              <MDBBtn
                className="px-3 py-2"
                onClick={this.handleAnalyze}
              >Analyze
              </MDBBtn>
            </td>
          </tr>
        </MDBTableBody>
      </MDBTable>
    );
  }
}
