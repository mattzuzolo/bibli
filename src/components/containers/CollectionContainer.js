import React, { Component } from "react";

import CollectionCard from "../CollectionCard"

class CollectionContainer extends Component {
  state = {
    localBooksArray: [],
  }

  //GET all the books that belong to the current collection and save to local state
  //fetch the selected collection on page load so all needed data is always available
  componentDidMount(){
    fetch(`http://localhost:3000/api/v1/collections/${this.props.collectionId}`)
      .then(response => response.json())
      .then(fetchedBooksArray => this.setState({ localBooksArray: fetchedBooksArray }))
  }

  //display all the books in the current collection
  render(){
    return(
      <div className="div--collection-container">
        <h1>Collection: {this.props.selectedCollection.name}</h1>
        {this.state.localBooksArray.map(book => (
          <CollectionCard
            book={book}
            key={book.id}
            id={book.id}
            title={book.title}
            author={book.author}
            onCollectionCardClick={this.props.onCollectionCardClick}
           />
        ))}
      </div>
    )
  }
}

export default CollectionContainer;
