import React from 'react';
import './GGM.scss';
import {
  MDBTable, MDBTableHead, MDBTableBody, Row, Col
} from 'mdbreact';
import Select from 'react-select';


function computeD1({ D, g } = {}) {
  return +D * (1 + +g) || 0;
}

function computeP({ D, r, g } = {}) {
  return computeD1({ D, g }) / (r - g) || 0;
}

export default class extends React.Component {
  get chart() {
    return this.chartRef.current.chart;
  }

  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCompanyChange = this.handleCompanyChange.bind(this);
    this.state = {
      selectedCompany: '',
      companies: [
        { name: 'Google', P: 67.2 },
        { name: 'Microsoft', P: 55.1 },
        { name: 'Apple', P: 83.5 }
      ]
    };
  }

  handleInputChange(event) {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value
    });
  }

  handleCompanyChange(company) {
    this.setState({
      selectedCompany: company
    });
  }

  render() {
    const {
      companies, selectedCompany, D, r, g
    } = this.state;
    const companyOptions = companies.map((companyI) => ({ label: companyI.name, value: companyI }));
    const company = selectedCompany.value;

    return (
      <Row className="m-5">
        <Col className="">
          <div className="card">
            <MDBTable>
              <MDBTableHead>
                <tr>
                  <th>Current Dividend(D0)</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                <tr>
                  <td>
                    <input name="D" value={D} onChange={this.handleInputChange} type="number" />
                  </td>
                </tr>
              </MDBTableBody>
              <MDBTableHead>
                <tr>
                  <th>The Interest Rate(r)</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                <tr>
                  <td>
                    <input name="r" value={r} onChange={this.handleInputChange} type="number" min="0" step="0.1" />
                  </td>
                </tr>
              </MDBTableBody>
              <MDBTableHead>
                <tr>
                  <th>Growth Rate In Dividends(g)</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                <tr>
                  <td>
                    <input name="g" value={g} onChange={this.handleInputChange} type="number" min="0" step="0.1" />
                  </td>
                </tr>
              </MDBTableBody>
            </MDBTable>

          </div>
        </Col>

        <Col className="">
          <div className="card">
            <div className="d-inline-block my-3 col-6 offset-6">
              <Select
                options={companyOptions}
                value={selectedCompany}
                onChange={this.handleCompanyChange}
              />
            </div>
            <MDBTable>
              <MDBTableHead>
                <tr>
                  <td>Company Stock Price<sub>({company && company.name})</sub></td>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                <tr>
                  <td>
                    {company && company.P}
                  </td>
                </tr>
              </MDBTableBody>
              <MDBTableHead>
                <tr>
                  <th>Current Price Of Stock(P0)</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                <tr>
                  <td>
                    {computeP({ D, r, g }).toFixed(3)}
                  </td>
                </tr>
              </MDBTableBody>
              <MDBTableHead>
                <tr>
                  <th>Dividend Next Period(D1)</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                <tr>
                  <td>
                    {computeD1({ D, g })}
                  </td>
                </tr>
              </MDBTableBody>
            </MDBTable>
          </div>
        </Col>
      </Row>
    );
  }
}
