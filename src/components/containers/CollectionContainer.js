import React, { Component } from "react";

import CollectionCard from "../CollectionCard"

class CollectionContainer extends Component {
  state = {
    localBooksArray: [],
    bookCollectionArray: [],
  }

  //GET all the books that belong to the current collection and save to local state
  //fetch the selected collection on page load so all needed data is always available
  componentDidMount(){
    fetch(`https://infinite-spire-87700.herokuapp.com/api/v1/collections/${this.props.collectionId}`)
      .then(response => response.json())
      .then(fetchedBooksArray => this.setState({ localBooksArray: fetchedBooksArray }))

    fetch(`https://infinite-spire-87700.herokuapp.com/api/v1/book_collections`)
      .then(response => response.json())
      .then(fetchedBookCollectionArray => this.setState({bookCollectionArray: fetchedBookCollectionArray}))
    

  }

  removeFromCollection = (event, bookId) => {
    //convert collection prop to integer
    let targetCollection = parseInt(this.props.collectionId, 10);

    let bookCollectionTarget = this.state.bookCollectionArray.find(bookCollection => {
      return (bookCollection.book_id === bookId && bookCollection.collection_id === targetCollection)
    });


    //Now fetch the bookCollection to the backend. Delete the entry.
    //Optimistically remove the book from the list

    // fetch(`https://infinite-spire-87700.herokuapp.com/api/v1/book_collections/${bookCollectionId}`)
    //   .then(response => response.json())
  }

  //display all the books in the current collection
  render(){
    return(
      <div className="div--collection-container">
        <h1 className="h1--collection-container-name">Collection: {this.props.selectedCollection.name}</h1>
        <div className="div--collection-card-list">
          {this.state.localBooksArray.map(book => (
            <CollectionCard
              book={book}
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              image={book.thumbnail_url}
              onCollectionCardClick={this.props.onCollectionCardClick}
              removeFromCollection={this.removeFromCollection}
             />
          ))}
        </div>
      </div>
    )
  }
}

export default CollectionContainer;
