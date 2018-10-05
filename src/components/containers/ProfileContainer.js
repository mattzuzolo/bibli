import React, { Component } from "react";
import CollectionSidebarList from "./CollectionSidebarList"

class ProfileContainer extends Component {
  componentDidMount(){
    let token = localStorage.getItem("token");
    if(!!token){
      console.log("TOKEN IS PRESENT!!!")
      return fetch(`http://localhost:3000/api/v1/users/${token}`)
        .then(response => response.json())
        .then(foundUser => this.props.loginUser(foundUser))
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
            newCollectionInput={this.props.newCollectionInput}
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
