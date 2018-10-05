import React, { Component } from "react";

class CollectionCard extends Component {
  render(){
    
    return(
      <div className="div--collection-card" onClick={(event) => this.props.onCollectionCardClick(event, this.props.book)}>
        <div className="div--collection-card-thumb">
          <img src={this.props.image} alt="book-cover"/>
        </div>
        <div className="div--collection-card-details">
          <h1>{this.props.title}</h1>
          <p>by <strong>{this.props.author}</strong></p>
          <p>{this.props.year}</p>
        </div>
      </div>
    )
  }
}

export default CollectionCard;
