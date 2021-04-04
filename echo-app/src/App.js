import NavigationBar from './NavigationBar'
import Home from './pages/Home/Home'
import Dashboard from './pages/Dashboard/Dashboard'
import Create from './pages/Create/Create'
import Play from './pages/Play/Play'
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
        <NavigationBar></NavigationBar>
      <Switch>
        <Route path='/home'>
        <Home></Home>
        </Route>
        <Route path='/dashboard'>
          <Dashboard></Dashboard>
        </Route>
        <Route path='/create'>
          <Create></Create>
        </Route>
        <Route path='/play'>
          <Play></Play>
        </Route>
      </Switch>
      </Router>
      </header>
    </div>
  );
}

export default App;
