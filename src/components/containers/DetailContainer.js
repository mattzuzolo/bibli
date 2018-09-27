import React, { Component } from "react";

class DetailContainer extends Component {

  state = {
    title: "",
    author: ""
  }

  componentDidMount(){
    fetch(`http://localhost:3000/api/v1/books/${this.props.bookId}`)
      .then(response => response.json())
      .then(book => this.setState({
        title: book.title,
        author: book.author,
      }))
  }

  render(){
    return(
      <div>
        <h1>{this.state.title} by {this.state.author}</h1>
      </div>
    )
  }
}

export default DetailContainer;
