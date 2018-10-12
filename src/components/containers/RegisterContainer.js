import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const userUrl = "https://infinite-spire-87700.herokuapp.com/api/v1/users"

class RegisterContainer extends Component {
    state = {
      email: "",
      password: "",
    }

  //checks to see if user is already logged in by checking token.
  //If user has a token, they are pushed to the profile page
  //If token is invalid upon reaching /profile, user will be pushed back to /login
  componentDidMount(){
    let token = localStorage.getItem("token");
    if(token){
      this.props.routerProps.history.push("/profile")
    }
  }

  //Updates local state to maintain controlled form
  onInputChange = (event) => {
    let fieldName = event.target.name;
    let currentValue = event.target.value;
    this.setState({ [fieldName]: currentValue })
  }

  //creates a new user by POSTing to API
  onRegisterSubmit = (event) => {
    event.preventDefault();

    let newUserPostBody = {
      email: this.state.email,
      password: this.state.password,
    }

    let newUserPostConfig = {
      Accept: "application/json",
       method: "POST",
       headers: {
         "Content-type": "application/json"
       },
       body: JSON.stringify(newUserPostBody)
     };

     console.log("newUserPostConfig", newUserPostConfig)

    fetch(userUrl, newUserPostConfig)
      .then(response => response.json())
      .then(this.props.routerProps.history.push("/login"))
      .catch(error => {
        console.log("ERROR:", error)
        alert("Registration failed")
      })
  }

  render(){
    return(
      <div className="container div--login-container">
        <h1 className="login-title">Register:</h1>
        <form className="form form--login" onSubmit={this.onRegisterSubmit}>
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
        <p className="register">Don't feel like registering? Visit the <Link to="/login">Login page</Link> to enter with guest credentials.</p>
      </div>
    )
  }
}

export default RegisterContainer
