import React, { Component } from "react";

import CollectionCard from "../CollectionCard"

class SearchResultsContainer extends Component {
  render(){
    console.log("Book array in search results container", this.props.fetchedBookArray)
    return(
      <div>
        {this.props.fetchedBookArray.map(book => (
          <CollectionCard
            book={book}
            key={book.id}
            it={book.id}
            title={book.volumeInfo.title}
            author={book.volumeInfo.authors[0]}
            onCollectionCardClick={this.props.onCollectionCardClick}
          />
        ))}
      </div>
    )
  }
}

export default SearchResultsContainer;
