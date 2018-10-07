import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  render(){
    return(
      <div className="div--nav-bar">
        <Link className="nav-item div--nav-bar-item nav-left logo" to="/profile">Bibli</Link>
        <form
          className="nav-search nav-item div--nav-bar-item nav-left" onSubmit={this.props.onSearchSubmit}>
            <input
              className="nav-search"
              value={this.props.searchQuery}
              onChange={this.props.onSearchQueryChange}
              placeholder="Search for a book or author">
            </input>
        </form>
        {/*Checks to see if there is a user logged in to local react state and renders navbar options conditionally*/}
        { typeof this.props.currentUser.id === "number"
                    ?
                    <Fragment>
                      <button className="nav-item div--nav-bar-item nav-right button-logout" onClick={this.props.logoutUser}>Logout</button>
                        <Link className="nav-item div--nav-bar-item nav-right" to="/profile">Profile</Link>
                        <Link className="nav-item div--nav-bar-item nav-right" to="/about">about</Link>
                    </Fragment>
                    :
                    <Fragment>
                      <Link className="nav-item div--nav-bar-item nav-right" to="/register">register</Link>
                      <Link className="nav-item div--nav-bar-item nav-right" to="/login">login</Link>
                      <Link className="nav-item div--nav-bar-item nav-right" to="/about">about</Link>

                    </Fragment>
          }
      </div>
    )
  }
}

export default NavBar;
