import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';

class Home extends Component {
  render() {
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Welcome to the Virtual Dojo!
            </p>
          </header>
        </div>
    );
  }
}

export default Home;
