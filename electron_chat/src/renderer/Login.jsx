import React, { Component } from 'react';
import { Link } from 'react-router';

class Login extends Component {
  render() {
    return (
      <div>
        <h2>Login</h2>
        <Link to="/rooms">Login</Link><br/>
        <Link to="/signup">Create new account</Link><br/>
      </div>
    );
  }
}

export default Login;