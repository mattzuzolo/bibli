import React, { Component } from "react";

import CollectionSidebarItem from "../CollectionSidebarItem";

class CollectionSidebarList extends Component {
  render(){
    console.log("COLLECTION LIST PROPS", this.props.collectionsArray)
    return(
      <div className="div--collection-list">
        <h3>Your collections:</h3>
        <ul>
          {this.props.collectionsArray.map(collection => (
            <CollectionSidebarItem
              collection={collection}
              id={collection.id}
              key={collection.id}
              name={collection.name}
              onCollectionItemClick={this.props.onCollectionItemClick}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default CollectionSidebarList;
