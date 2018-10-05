import React, { Component } from "react";

import CollectionCard from "../CollectionCard"

class SearchResultsContainer extends Component {

  render(){
    return(
      <div className="div--search-results-container">
        {this.props.fetchedBookArray.map(book => (
          <CollectionCard
            book={book}
            key={book.id}
            id={book.id}
            title={book.volumeInfo.title}
            author={book.volumeInfo.authors[0]}
            image={book.volumeInfo.imageLinks.thumbnail}
            year={book.volumeInfo.publishedDate}
            onCollectionCardClick={this.props.onCollectionCardClick}
          />
        ))}
      </div>
    )
  }
}

export default SearchResultsContainer;
