import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom' 
import MainContainer from './container/MainContainer';
import NavBar from './component/NavBar';
import './App.css';




function App() {
  return (
    <Router>
      <div className="App">
        <div className= "nav-bar">
          <NavBar/>
        </div>
        <div className='main-container'>
          <MainContainer/>
        </div>
      </div>
    </Router>
  );
}

export default App;
