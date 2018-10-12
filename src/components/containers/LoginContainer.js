import React, { Component } from 'react';

const loginUrl = "https://infinite-spire-87700.herokuapp.com/login"

class LoginContainer extends Component {
    state = {
      email: "",
      password: "",
    }

  //checks to see if user is already logged in by checking token.
  //If user has a token, they are pushed to the profile page
  //If token is invalid upon reaching /profile, user will be pushed to /login
  componentDidMount(){
    let token = localStorage.getItem("token");
    if(token){
      this.props.routerProps.history.push("/profile")
    }
  }

  //creates a new user by POSTing to API
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

    fetch(loginUrl, loginPostConfig)
      .then(response => response.json())
      .then(userData => {
        if(userData.email){
          this.props.loginUser(userData);
          localStorage.setItem("token", userData.id);           this.props.routerProps.history.push("/profile");
        }
      })
  }

  guestLogin = (event) => {
    let loginPostBody = {
      email: "guest@gmail.com",
      password: "guest",
    }

    let loginPostConfig = {
      Accept: "application/json",
       method: "POST",
       headers: {
         "Content-type": "application/json",
       },
       body: JSON.stringify(loginPostBody)
     };

     fetch(loginUrl, loginPostConfig)
       .then(response => response.json())
       .then(userData => {
         if(userData.email){
           this.props.loginUser(userData)
           localStorage.setItem("token", userData.id)
           this.props.routerProps.history.push("/profile")
         }
       })

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
