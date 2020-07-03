import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom' 
import MainContainer from './container/MainContainer';
import NavBar from './component/NavBar';
import './App.css';
import Test from './container/Test';




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

        {/* <div>
          <Test/>
        </div> */}
        
      </div>
    </Router>
  );
}

export default App;
