import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {

  //clear loggedin redux state, remove token and push to login upon clicking logout

  render(){
    return(
      <div className="div--nav-bar">
        <Link className="nav-item div--nav-bar-item nav-left logo" to="/home">Bibli</Link>
        <form
          className="nav-search nav-item div--nav-bar-item nav-left" onSubmit={this.props.onSearchSubmit}>
            <input
              className="nav-search"
              value={this.props.searchQuery}
              onChange={this.props.onSearchQueryChange}
              placeholder="Search for a book or author">
            </input>
        </form>

        { typeof this.props.currentUser.id === "number"
                    ?
                    <Fragment>
                      <button className="nav-item div--nav-bar-item nav-right button-logout" onClick={this.props.logoutUser}>Logout</button>
                        <Link className="nav-item div--nav-bar-item nav-right logo" to="/profile">Profile</Link>
                    </Fragment>
                    :
                    <Fragment>
                      <Link className="nav-item div--nav-bar-item nav-right logo" to="/register">register</Link>
                      <Link className="nav-item div--nav-bar-item nav-right logo" to="/login">login</Link>

                    </Fragment>
          }


      </div>
    )
  }
}

export default NavBar;
