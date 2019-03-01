import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./Components/Login";
import Notifications from 'react-notify-toast';
import "animate.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Notifications />
        <Login />
      </div>
    );
  }
}
export default App;