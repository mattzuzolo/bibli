import React, { Component } from "react";
import CollectionSidebarList from "./CollectionSidebarList"

class ProfileContainer extends Component {
  render(){
    return(
      <div className="div--profile-container">
        <CollectionSidebarList
          collectionsArray={this.props.collectionsArray}
          onCollectionItemClick={this.props.onCollectionItemClick}
        />
        <div>
          <h1>Welcome to Bibli, {this.props.currentUser.email}</h1>
        </div>
      </div>
    )
  }
}

export default ProfileContainer;
