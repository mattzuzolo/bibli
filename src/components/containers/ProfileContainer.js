import React, { Component } from "react";
import CollectionSidebarList from "./CollectionSidebarList"

class ProfileContainer extends Component {
  componentDidMount(){
    let token = localStorage.getItem("token");
    if(!!token){
      return fetch(`http://localhost:3000/users/${token}`)
        .then(response => response.json())
        .then(foundUser => this.setState({currentUser: foundUser}))
    }
    else {
      this.props.routerProps.history.push(`/login`);
    }
  }
  render(){
    return(
      <div className="div--profile-container">

        <div className="div--left-column">
          <CollectionSidebarList
            collectionsArray={this.props.collectionsArray}
            onCollectionItemClick={this.props.onCollectionItemClick}
            onNewCollectionInputChange={this.props.onNewCollectionInputChange}
            onNewCollectionInputSubmit={this.props.onNewCollectionInputSubmit}
          />
        </div>

        <div className="div--right-column">
          <h1>Welcome to Bibli, {this.props.currentUser.email}</h1>
        </div>

      </div>
    )
  }
}

export default ProfileContainer;
