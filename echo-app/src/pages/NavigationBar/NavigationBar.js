import React, { useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import logo from '../../static/whitetenor.png';
import {Link} from 'react-router-dom';
import { Button, Navbar, Nav } from 'react-bootstrap'
import { useAuth } from '../../auth/AuthState'
import { checkLogin, isLoggedIn } from '../../auth/AuthAction'
import { cognitoLogin, logout } from '../../auth/AuthAction';

function NavigationBar() {
  const [ authState, authDispatch ] = useAuth()

  useEffect(() => {
    checkLogin(authDispatch);
  }, [])

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
        {
          isLoggedIn(authState) ?
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to='/home'>Home</Nav.Link>
            <Nav.Link className="auth-button" onClick={() => logout(authDispatch)} as={Link} to='/home'>Logout</Nav.Link>
          </Nav> : 
          <Nav className="ml-auto">
            <Nav.Link as={Link} to='/home'>Home</Nav.Link>
            <Nav.Link className="auth-button" href={cognitoLogin}>Login</Nav.Link>
          </Nav>
        }
      </Navbar.Collapse>
    </Navbar>
    </>
  );
}

export default NavigationBar;
