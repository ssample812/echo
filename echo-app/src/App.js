import React, { useEffect } from 'react'
import { AuthState } from './auth/AuthState'
import NavigationBar from './pages/NavigationBar/NavigationBar'
import Home from './pages/Home/Home'
import Dashboard from './pages/Dashboard/Dashboard'
import Create from './pages/Create/Create'
import Play from './pages/Play/Play'
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"

function App() {
  return (
    <AuthState>
      <div className="App">
        <header className="App-header">
          <Router>
            <NavigationBar />
            <Switch>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              <Route path='/home'>
                <Home></Home>
              </Route>
              <Route path='/dashboard'>
                <Dashboard></Dashboard>
              </Route>
              <Route path='/create/:userid/:itemid'>
                <Create></Create>
              </Route>
              <Route path='/play'>
                <Play></Play>
              </Route>
            </Switch>
          </Router>
        </header>
      </div>
    </AuthState>
  );
}

export default App;
