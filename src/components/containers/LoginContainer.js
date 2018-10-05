import React, { Component } from 'react';

class LoginContainer extends Component {
    state = {
      email: "",
      password: "",
    }

  onInputChange = (event) => {
    let fieldName = event.target.name;
    let currentValue = event.target.value;
    this.setState({ [fieldName]: currentValue })
  }

  onLoginSubmit = (event) => {
    event.preventDefault();

    let loginPostBody = {
      email: this.state.email,
      password: this.state.password,
    }

    let loginPostConfig = {
      Accept: "application/json",
       method: "POST",
       headers: {
         "Content-type": "application/json",
       },
       body: JSON.stringify(loginPostBody)
     };

    console.log("FETCH WOULD OCCUR HERE:", loginPostConfig)
  }

  guestLogin = (event) => {
    let loginPostBody = {
      email: "guest@guest.com",
      password: "123456789",
    }

    let loginPostConfig = {
      Accept: "application/json",
       method: "POST",
       headers: {
         "Content-type": "application/json",
       },
       body: JSON.stringify(loginPostBody)
     };

    console.log("GUEST FETCH WOULD OCCUR HERE:", loginPostConfig)

  }

  render(){
    return(
      <div className="container div--login-container">
        <h1 className="login-title">Login:</h1>
        <form className="form form--login" onSubmit={this.onLoginSubmit}>
          <div className="login-form-elements">
            <label>Email:</label>
            <input className="input form--login-input" placeholder="email" name="email" value={this.state.email} onChange={this.onInputChange} ></input>
            <br/>
            <label>Password:</label>
            <input className="input form--login-input" placeholder="password" name="password" type="password" value={this.state.password} onChange={this.onInputChange} ></input>
            <br/>
            <button className="button button--login">Login</button>
          </div>
        </form>
        <p onClick={this.guestLogin} className="guest-credentials login">Don't have an account? Click here to login with guest credentials</p>
      </div>
    )
  }
}

export default LoginContainer;
