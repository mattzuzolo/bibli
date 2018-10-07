import React, { Component } from "react";

class DetailContainer extends Component {

  state = {
    title: "",
    author: "",
    description: "",
    genre: "",
    google_id: "",
    google_url: "",
    id: null,
    // isbn_ten: "",
    // isbn_thirteen: "",
    page_count: null,
    thumbnail_url: "",
    year: "",
  }

  //fetch the selected book on mount so all needed data is always available
  componentDidMount(){
    fetch(`http://localhost:3000/api/v1/books/${this.props.bookId}`)
      .then(response => response.json())
      .then(foundBook => this.setState({
        title: foundBook.title,
        author: foundBook.author,
        description: foundBook.description,
        genre: foundBook.genre,
        google_id: foundBook.google_id,
        google_url: foundBook.google_url,
        id: foundBook.id,
        isbn_ten: foundBook.isbn_ten,
        isbn_thirteen: foundBook.isbn_thirteen,
        page_count: foundBook.page_count,
        thumbnail_url: foundBook.thumbnail_url,
        year: foundBook.year,
      }))
      .catch(console.error)
  }

  render(){
    //This JSX displays the book + details. Also allows user to add the current book to an existing collection via select option below
    console.log("DETAIL CONTAINER STATE", this.state)
    return(
      <div className="div--detail-container">

        <div className="div--book-column div--book-left">
          <div className="div--book-image">
            <img src={this.state.thumbnail_url} alt="book-cover"/>
          </div>
          <div>
            <a href={this.state.google_url} target="_blank">View on Google Books</a>
          </div>
          <div className="div--collection-dropdown">
            <p>Add this book to a collection:</p>
              <select onChange={(event) => this.props.onAddBookToCollectionSubmit(event, this.state.id)}>
                <option></option>
                {this.props.collectionsArray.map(collection => <option value={collection.id} key={collection.id}>{collection.name}</option>)}
              </select>
              <button onClick={this.props.onAddBookToCollectionSubmit}>Add book</button>
          </div>
        </div>

        <div className="div--book-column div--book-right">
          <div className="div--book-right-primary">
            <h1 className="h1--book-title">{this.state.title}</h1>
            <p className="p--book-author">by <strong>{this.state.author}</strong></p>
            <p>{this.state.description}</p>
          </div>
          <hr/>
          <div className="div--book-right-secondary">
            <h3 className="h3--book-details">Details:</h3>
            <p><strong>Genre:</strong> {this.state.genre}</p>
            <p><strong>Released:</strong> {this.state.year}</p>
            <p><strong>Count:</strong> {this.state.page_count} pages</p>
          </div>
        </div>
      </div>
    )
  }
}

export default DetailContainer;
