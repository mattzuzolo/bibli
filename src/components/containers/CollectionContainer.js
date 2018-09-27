import React, { Component } from "react";

import CollectionCard from "../CollectionCard"

class CollectionContainer extends Component {
  state = {
    localBooksArray: [],
  }
  componentDidMount(){
    fetch(`http://localhost:3000/api/v1/collections/${this.props.collectionId}`)
      .then(response => response.json())
      .then(fetchedBooksArray => this.setState({ localBooksArray: fetchedBooksArray }))
  }

  render(){
    return(
      <div>
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
