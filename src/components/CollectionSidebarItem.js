import React, { Component } from "react";

class CollectionSidebarItem extends Component {
  render(){
    return(
      <li className="li--collection-item" onClick={(event) => this.props.onCollectionItemClick(event, this.props.collection)}>
        {this.props.name}
      </li>
    )
  }
}

export default CollectionSidebarItem;
