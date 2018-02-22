import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//import components and adapter here
import Navbar from './components/Navbar'
import MainContainer from './components/MainContainer'

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <MainContainer />
      </div>
    );
  }
}

export default App;
