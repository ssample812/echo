import React from 'react'
import {BrowserRouter as Router,Switch,Route,Link, Redirect} from 'react-router-dom'
import Create from '../Create/Create'
import Play from '../Play/Play'

function Dashboard() {
    return(
        <>
            <div>
                <h1>Fancy Dashboard Page</h1>
                <Router>
                    <a href='/create'>Create</a>
                    <Switch>
                        <Route path='/create'>
                            <Create></Create>
                        </Route>
                    </Switch>
                </Router>
            </div>
        </>
    );
}

export default Dashboard;