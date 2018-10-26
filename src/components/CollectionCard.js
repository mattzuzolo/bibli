import React, { Component } from "react";

class CollectionCard extends Component {

  render(){
    console.log("REMOVE EXISTS?", !this.props.removeFromCollection)
    return(
      <div className="div--collection-card" onClick={(event) => this.props.onCollectionCardClick(event, this.props.book)}>
        <div className="div--collection-card-thumb">
          <img src={this.props.image} alt="book-cover"/>
        </div>
        <div className="div--collection-card-details">
          <h1>{this.props.title}</h1>
          <p className="div--collection-card-detail">by <span className="span--author-name">{this.props.author}</span></p>
          <p>{this.props.year}</p>
          {!!this.props.removeFromCollection ?
            <button type="button" onClick={(event) => this.props.removeFromCollection()}>REMOVE FROM COLLECTION</button>
            :
            null
          }
        </div>
      </div>
    )
  }
}

export default CollectionCard;
