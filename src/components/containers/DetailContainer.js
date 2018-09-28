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
    isbn_ten: "",
    isbn_thirteen: "",
    page_count: null,
    thumbnail_url: "",
    year: "",
  }

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
    console.log("CURRENT STATE OF DETAIL", this.state)
    return(
      <div>
        <h1>{this.state.title} by {this.state.author}</h1>
      </div>
    )
  }
}

export default DetailContainer;
