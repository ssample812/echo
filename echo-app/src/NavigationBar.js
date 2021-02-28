import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import logo from './whitetenor.png'

import { Button, Navbar, Nav } from 'react-bootstrap'


function NavigationBar() {
  return (
    <>
    <Navbar className="nav" expand="lg">
    <Navbar.Brand href="#home">
      <img
        alt=""
        src={logo}
        width="20"
        height="30"
        className="d-inline-block align-top"
      />{' '}
      Echo
    </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="ml-auto">
          <Nav.Link href="#home">About</Nav.Link>
          <Nav.Link href="#home">Create Account</Nav.Link>
          <Button>Login</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </>
  );
}

export default NavigationBar;
