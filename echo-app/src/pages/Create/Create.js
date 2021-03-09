import React from 'react'
import {BrowserRouter as Router,Link, Route, Switch} from 'react-router-dom'
import Play from '../Play/Play'

function Create() {
    return(
        <>
            <div>
                <h1>Fancy Create Page</h1>
                <Router>
                    <a href='/play'>Play</a>
                    <Switch>
                        <Route path='/play'>
                            <Play></Play>
                        </Route>
                    </Switch>
                </Router>
            </div>
        </>
    );
}

export default Create;