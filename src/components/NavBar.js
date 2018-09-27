import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class NavBar extends Component {

  render(){
    console.log("Query state", this.props.searchQuery)
    return(
      <div className="div--nav-bar">
        <Link className="nav-item div--nav-bar-item nav-left logo" to="/profile">Bibli</Link>
        <form
          className="nav-search nav-item div--nav-bar-item nav-left" onSubmit={this.props.onSearchSubmit}>

            <input
              className="nav-search"
              value={this.props.searchQuery}
              onChange={this.props.onSearchQueryChange}
              placeholder="Search for a book, author or ISBN">
            </input>
        </form>


        <Link className="nav-item div--nav-bar-item nav-right" to="/profile">Profile</Link>
      </div>
    )
  }
}

export default NavBar;
