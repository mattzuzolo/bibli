import React, { Component } from "react";

class CollectionCard extends Component {
  render(){
    return(
      <div className="div--collection-card" onClick={(event) => this.props.onCollectionCardClick(event, this.props.book)}>
        <p>{this.props.title} by {this.props.author}</p>
      </div>
    )
  }
}

export default CollectionCard;
