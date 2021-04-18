import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { cognitoLogin } from '../../auth/AuthAction'


function LoginError(props) {
  return (
    <>
    <div className="container">
          <div className="card border border-dark">
            <div className="card-body">
              <h1 className="font-weight-light">Login</h1>
              <p>{props.pageTitle} unavaible! Please <a href={cognitoLogin}>Login</a> first.</p>
            </div>
          </div>
        </div>
    </>
  );
}

export default LoginError;