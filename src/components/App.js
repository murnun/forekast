import React, { Component } from 'react';
import SearchCity from './SearchCity';
import '../styles/css/App.css';

class App extends Component{
  render() {
    return (
      <div className="App">
        <h1 id="logo">ForeKast</h1>
        <SearchCity weatherInfo={false} />
      </div>
    );
  }
}

export default App;
