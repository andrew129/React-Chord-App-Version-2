import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './components/pages/Home';
import NavBar from './components/NavBar/NavBar';
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Router>
          <Route exact path='/' component={Home} />
        </Router>
      </div>
    );
  }
}

export default App;
