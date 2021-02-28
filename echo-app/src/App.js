import NavigationBar from './NavigationBar'
import Home from './Home'
import './App.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavigationBar></NavigationBar>
      </header>
      <Home></Home>
    </div>
  );
}

export default App;
