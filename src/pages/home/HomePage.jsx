/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import React from 'react';
import {
  MDBView, MDBMask
} from 'mdbreact';
import './HomePage.scss';


export default class extends React.Component {
  render() {
    return (
      <MDBView src="https://mdbootstrap.com/img/Photos/Others/img%20(51).jpg">
        <MDBMask overlay="black-strong" className="flex-center flex-column text-white text-center">
          <h2>This Navbar isn't fixed</h2>
          <h5>When you scroll down it will disappear</h5>
          <br />
          <p>Full page intro with background image will be always displayed in full screen mode, regardless of device </p>
        </MDBMask>
      </MDBView>
    );
  }
}
