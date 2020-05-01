/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import {
  MDBTable, MDBTableHead, MDBBadge, MDBTableBody
} from 'mdbreact';


function isValidAsset(asset) {
  return asset.mean != null && asset.stdev != null && asset.corr != null;
}

export default class extends Component {
  constructor(props) {
    super(props);
    this.handleAssetsChange = this.handleAssetsChange.bind(this);
    this.handleRemoveAsset = this.handleRemoveAsset.bind(this);
    const assets = props.value || [
      {
        mean: 0,
        stdev: 0,
        corr: 0
      }, {
        mean: 0,
        stdev: 0,
        corr: 0
      }, {

      }
    ];
    this.state = {
      assets
    };
  }

  handleAssetsChange(event) {
    const { name, value, dataset: { index } } = event.target;
    this.setState((prevState) => {
      const { assets } = prevState;
      if (+index >= assets.length) {
        assets.push({});
      }
      assets[+index][name] = value.replace(/[^\d-.]/g, '');

      const lastAsset = assets[assets.length - 1];
      return {
        assets: isValidAsset(lastAsset)
          ? [...assets, {}]
          : assets
      };
    }, () => {
      if (this.props.onChange) {
        this.props.onChange({
          target: {
            name: this.props.name,
            value: this.state.assets
          }
        });
      }
    });
  }

  handleRemoveAsset(event) {
    const { dataset: { index } } = event.target;
    this.setState((prevState) => {
      const { assets } = prevState;
      if (Number.isNaN(+index) || assets.length < 2) {
        return null;
      }
      assets.splice(+index, 1);
      const lastAsset = assets[assets.length - 1];
      lastAsset.key = Math.random();
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
        onChange={this.handleAssetsChange}
        className="form-control"
      />
    );
  }

  render() {
    const { assets: stateAssets } = this.state;
    const { value: propsAssets } = this.props;
    const assets = propsAssets || stateAssets;

    return (
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
            {assets.map(({ mean, key }, index) => (
              <td key={key || `mean-${index}`}>
                {this.renderInput(mean, 'mean', index)}
              </td>
            ))}
          </tr>
          <tr>
            <td><b>Stdev</b></td>
            {assets.map(({ stdev, key }, index) => (
              <td key={key || `stdev-${index}`}>
                {this.renderInput(stdev, 'stdev', index)}
              </td>
            ))}
          </tr>
          <tr>
            <td><b>Corr</b></td>
            {assets.map(({ corr, key }, index) => (
              <td key={key || `corr-${index}`}>
                {this.renderInput(corr, 'corr', index)}
              </td>
            ))}
          </tr>
        </MDBTableBody>
      </MDBTable>
    );
  }
}
