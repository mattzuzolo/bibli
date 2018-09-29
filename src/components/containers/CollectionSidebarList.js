import React, { Component } from "react";
import CollectionSidebarItem from "../CollectionSidebarItem";

class CollectionSidebarList extends Component {
  //Create a new collection in the profile page using this component and form below
  render(){
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
        <h3>Create a new collection:</h3>
        <form onSubmit={this.props.onNewCollectionInputSubmit}>
          <input onChange={this.props.onNewCollectionInputChange}  placeholder="Give your new collection a name"></input>
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

export default CollectionSidebarList;
