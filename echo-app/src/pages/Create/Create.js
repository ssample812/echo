import React from 'react'
import { Button } from 'react-bootstrap'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import Play from '../Play/Play'

function Create() {
    return(
        <>
        <div className="container">
            <div className="card border border-dark">
                <div className="card-body">
                <h1>Create Page</h1>
                    <Router>
                        <Button href='/play'>Play</Button>
                        <Switch>
                            <Route path='/play'>
                                <Play></Play>
                            </Route>
                        </Switch>
                    </Router>
                </div>
            </div>
        </div>
        </>
    );
}

export default Create;