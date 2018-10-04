import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import './App.css';

//Containers
import CollectionContainer from "./components/containers/CollectionContainer"
import SearchResultsContainer from "./components/containers/SearchResultsContainer"
import DetailContainer from "./components/containers/DetailContainer"
import ProfileContainer from "./components/containers/ProfileContainer"

//Components
import NavBar from "./components/NavBar"

//Rails API endpoints
const bookUrl = "http://localhost:3000/api/v1/books"
const collectionsUrl = "http://localhost:3000/api/v1/collections"
const bookCollectionUrl = "http://localhost:3000/api/v1/book_collections"

class App extends Component {
  state = {
    searchQuery: "",
    newCollectionInput: "",
    currentUser: {id: 1, email: "matt@gmail.com", created_at: "2018-09-26T14:40:45.916Z", updated_at: "2018-09-26T14:40:45.916Z"},
    collectionsArray: [],
    selectedCollection: {},
    fetchedBookArray: [],
    allBooks: [],
    selectedBook: {},
  }

  componentDidMount(){
    //Fetch the user's collections on mount in order to display the list
    fetch(`http://localhost:3000/api/v1/users/${this.state.currentUser.id}/collections`)
      .then(response => response.json())
      .then(collectionsArray => this.setState({collectionsArray}))

    //fetch all the books to use rails API data when available (rather than google api)
    fetch(`http://localhost:3000/api/v1/books/`)
      .then(response => response.json())
      .then(allBooks => this.setState({allBooks}))
  }

  //Update state to maintain controlled book search form
  onSearchQueryChange = (event) => {
    this.setState({ searchQuery: event.target.value })
  }

  //Book search form submit event listener. Submission will trigger fetch to external Google books api
  onSearchSubmit = (event) => {
    event.preventDefault();
    //save query at time of submission and convert string to be used in query string for external API call
    let submittedQuery = this.state.searchQuery
    let submittedQueryWithPlus = submittedQuery.trim().split(' ').join('+');
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${submittedQueryWithPlus}`)
    // &maxResults=40
      .then(response => response.json())
      //update state with the fetchedBooks and reset the searchQuery input field
      .then(fetchedBookArray => this.setState({
        fetchedBookArray: fetchedBookArray.items,
        searchQuery: ""
      }))
      //Push users to the search result page after successfully fetching and setState
      .then(() => this.props.history.push(`/search/${submittedQueryWithPlus}`))
      .catch(error => {
        console.log("An error occurred during the fetch", error)
        this.setState({searchQuery: ""})
      })
  }

  //Update state to maintain controlled newCollectionInput field
  onNewCollectionInputChange = (event) => {
    this.setState({newCollectionInput: event.target.value})
  }

  //Event listener for create new Collection
  onNewCollectionInputSubmit = (event) => {
    event.preventDefault();
    //save data that will be POSTed to rails api
    let name = this.state.newCollectionInput;
    let collectionPostBody = {
      user_id: this.state.currentUser.id,
      name,
    }
    const collectionPostConfig = {
      Accept: "application/json",
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(collectionPostBody)
    }
    //POST request happens here. Input field reset and new collection optimistically rendered to state.collectionsArray
    fetch(collectionsUrl, collectionPostConfig)
    this.setState({
      newCollectionInput: "",
      collectionsArray: [...this.state.collectionsArray, collectionPostBody]
    })
  }

  //Event listener on event list so user can visit see the specific collection
  onCollectionItemClick = (event, selectedCollection) => {
    this.setState({selectedCollection: selectedCollection})
    //bring user to the apropriate collection on click
    this.props.history.push(`/collections/${selectedCollection.id}`)
  }

  //Checks if the selectedBook is available locally. If not, creates a new DB entry from external Google Books api
  checkIfBookExists = (allBooks, selectedBook) => {
    return allBooks.find(book => book.google_id === selectedBook.id)
  }

  onCollectionCardClick = (event, selectedBook) => {
    this.setState({selectedBook})

    let foundBook = this.checkIfBookExists(this.state.allBooks, selectedBook);

    //POST new book to DB if doesn't exist locally. Push user onward to detail page regardless.
    if(foundBook){
      return this.props.history.push(`/books/${foundBook.google_id}`)
    }
    else {
      let postBookBody = {
        title: selectedBook.volumeInfo.title,
        author: selectedBook.volumeInfo.authors[0],
        genre: selectedBook.volumeInfo.categories[0],
        year: selectedBook.volumeInfo.publishedDate,
        description: selectedBook.volumeInfo.description,
        page_count: selectedBook.volumeInfo.pageCount,
        google_id: selectedBook.id,
        google_url: selectedBook.volumeInfo.canonicalVolumeLink,
        thumbnail_url: selectedBook.volumeInfo.imageLinks.thumbnail,
        isbn_ten: selectedBook.volumeInfo.industryIdentifiers[1].identifier,
        isbn_thirteen: selectedBook.volumeInfo.industryIdentifiers[0].identifier,
      }
      this.postNewBook(postBookBody)
        .then(() => this.props.history.push(`/books/${postBookBody.google_id}`))
    }

  }

  //method to POST book to rails api
  postNewBook = (postBookBody) => {
    const postBookConfig = {
      Accept: "application/json",
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(postBookBody)
    }
    return fetch(bookUrl, postBookConfig)
  }

  //POST fetch that adds a new book to an existing collection
  onAddBookToCollectionSubmit = (event, book_id) => {
    let bookCollectionBody = {
      collection_id: parseInt(event.target.value, 10),
      book_id,
    }
    let postBookCollectionConfig = {
      Accept: "application/json",
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(bookCollectionBody)
    }
    return fetch(bookCollectionUrl, postBookCollectionConfig)
  }

  render() {
    return (
      <div className="App div--app">
        <Route path="/" render={(routerProps) => <NavBar
          {...routerProps}
          searchQuery={this.state.searchQuery}
          onSearchQueryChange={this.onSearchQueryChange}
          onSearchSubmit={this.onSearchSubmit} />}
        />
        <Switch>
            <Route path="/profile" render={(routerProps) => <ProfileContainer
              routerProps={routerProps}
              currentUser={this.state.currentUser}
              collectionsArray={this.state.collectionsArray}
              onCollectionItemClick={this.onCollectionItemClick}
              onNewCollectionInputChange={this.onNewCollectionInputChange}
              onNewCollectionInputSubmit={this.onNewCollectionInputSubmit}
            />}/>
            <Route path ={`/search/:query`} render={(routerProps) => {
                  let searchQuery = routerProps.match.params.id;
                  return <SearchResultsContainer
                            routerProps={routerProps}
                            searchQuery={searchQuery}
                            currentUser={this.state.currentUser}
                            fetchedBookArray={this.state.fetchedBookArray}
                            onCollectionCardClick={this.onCollectionCardClick}
                            />
              }}/>
            <Route path ={`/collections/:id`} render={(routerProps) => {
              let collectionId = routerProps.match.params.id;
              return <CollectionContainer
                        routerProps={routerProps}
                        collectionId={collectionId}
                        onCollectionCardClick={this.onCollectionCardClick}
                        currentUser={this.state.currentUser}
                        selectedCollection={this.state.selectedCollection}
                        />
            }}/>
            <Route path ={`/books/:id`} render={(routerProps) => {
                let bookId = routerProps.match.params.id;
                return <DetailContainer
                          routerProps={routerProps}
                          bookId={bookId}
                          selectedBook={this.state.selectedBook}
                          currentUser={this.state.currentUser}
                          collectionsArray={this.state.collectionsArray}
                          onAddBookToCollectionSubmit={this.onAddBookToCollectionSubmit}
                          />
            }}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
