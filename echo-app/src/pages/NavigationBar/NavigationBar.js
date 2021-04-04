import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import logo from '../../static/whitetenor.png'
import {Link} from 'react-router-dom';
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
         <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
          <Nav.Link as={Link} to='/home'>Home</Nav.Link>
          <Button>Login</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </>
  );
}

export default NavigationBar;
