import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './components/pages/Home';
import NavBar from './components/NavBar/NavBar';
import Generate from './components/pages/Generator';
import Progressions from './components/pages/Progressions';
import SignupForm from './components/SignupForm/SignupForm';
import LoginForm from './components/LoginForm/LoginForm';
import API from './utils/api';
import "./App.css";

class App extends Component {


  state = {
    user: null
  }

  componentDidMount() {
    this.getUser()
  }

  getUser = () => {
    API.getUserInfo().then(res => {
        if (res.data) {
            this.setState({user: res.data})
        }
        else {
            this.setState({user: null})
        }
    })
  }

  render() {
    return (
      <div>
        <NavBar user={this.state.user} />
        <Router>
          <Route exact path='/' render={props => <Home {...props} user={this.state.user} />} />
          <Route exact path='/generator' component={Generate} />
          <Route exact path='/chord-progressions' component={Progressions} />
          <Route exact path='/user/signup' component={SignupForm} />
          <Route exact path='/user/login' component={LoginForm} />
        </Router>
      </div>
    );
  }
}

export default App;
