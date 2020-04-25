/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBContainer, MDBView, MDBMask, MDBDropdownToggle, MDBDropdown, MDBDropdownMenu, MDBDropdownItem
} from 'mdbreact';
import './MainLayout.scss';


export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState((prevState) => ({
      collapse: !prevState.collapse
    }));
  }

  renderHeader() {
    return (
      <header>
        <MDBNavbar color="elegant-color" dark expand="md">
          <MDBContainer>
            <MDBNavbarBrand href="/">
              <strong>Finance</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.onClick} />
            <MDBCollapse isOpen={this.state.collapse} navbar>
              <MDBNavbarNav left>
                <NavLink to="/home" className="nav-item">
                  <MDBNavItem>
                    <MDBNavLink to="/home">Home</MDBNavLink>
                  </MDBNavItem>
                </NavLink>
                <MDBNavItem>
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      <div className="d-none d-md-inline">Equity</div>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu left>
                      <MDBDropdownItem href="/chart">Stock charts</MDBDropdownItem>
                      <MDBDropdownItem href="#!">Financial reports</MDBDropdownItem>
                      <MDBDropdownItem href="#!">GGM</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
                <NavLink to="/fixed-income" className="nav-item">
                  <MDBNavItem>
                    <MDBNavLink to="/fixed-income">Fix Income</MDBNavLink>
                  </MDBNavItem>
                </NavLink>
                <NavLink to="/fx" className="nav-item">
                  <MDBNavItem>
                    <MDBNavLink to="/fx">FX</MDBNavLink>
                  </MDBNavItem>
                </NavLink>
                <NavLink to="/derivatives" className="nav-item">
                  <MDBNavItem>
                    <MDBNavLink to="/derivatives">Derivatives</MDBNavLink>
                  </MDBNavItem>
                </NavLink>
                <NavLink to="/portfolio-management" className="nav-item">
                  <MDBNavItem>
                    <MDBNavLink to="/portfolio-management">Portfolio Management</MDBNavLink>
                  </MDBNavItem>
                </NavLink>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
      </header>
    );
  }

  renderBody() {
    return (
      <MDBContainer className="main-container flex-fill text-center m-0 p-0" fluid>
        {this.props.routes}
      </MDBContainer>
    );
  }

  render() {
    return (
      <article className="w-100 h-100 d-flex flex-column overflow-hidden">
        {this.renderHeader()}
        {this.renderBody()}
      </article>
    );
  }
}
