import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import './App.css';

//Containers
import CollectionContainer from "./components/containers/CollectionContainer"
import SearchResultsContainer from "./components/containers/SearchResultsContainer"
import DetailContainer from "./components/containers/DetailContainer"
import ProfileContainer from "./components/containers/ProfileContainer"
import LoginContainer from "./components/containers/LoginContainer"
import RegisterContainer from "./components/containers/RegisterContainer"
import AboutContainer from "./components/containers/AboutContainer"


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
    currentUser: {},
    collectionsArray: [],
    selectedCollection: {},
    fetchedBookArray: [],
    allBooks: [],
    selectedBook: {},
  }

  componentDidMount(){

    let token = localStorage.getItem("token");
    if(!!token){
      return fetch(`http://localhost:3000/users/api/v1/${token}`)
        .then(response => response.json())
        .then(foundUser => this.setState({currentUser: foundUser}))
    }
    else {
      this.props.history.push(`/login`);
    }


    //Fetch the user's collections on mount in order to display the list
    // fetch(`http://localhost:3000/api/v1/users/${this.state.currentUser.id}/collections`)
    //   .then(response => response.json())
    //   .then(collectionsArray => this.setState({collectionsArray}))

    //fetch all the books to use rails API data when available (rather than google api)
    fetch(`http://localhost:3000/api/v1/books/`)
      .then(response => response.json())
      .then(allBooks => this.setState({allBooks}))
  }

  loginUser = (currentUser) => {
    this.setState({currentUser}, () => {
        this.props.history.push(`/profile`);
    })

    fetch(`http://localhost:3000/api/v1/users/${this.state.currentUser.id}/collections`)
      .then(response => response.json())
      .then(collectionsArray => this.setState({collectionsArray}))
  }

  logoutUser = () => {
    this.setState({ currentUser: {} })
    localStorage.removeItem("token");
    this.props.history.push(`/login`)
  }

  //Update state to maintain controlled book search form
  onSearchQueryChange = (event) => {
    this.setState({ searchQuery: event.target.value })
  }

  formatForFetch = (query) => {
    return query.trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(' ').join('+');
  }

  filterMissingKeys = (bookArray) => {
    return bookArray.filter(book => {
      console.log("BOOK", book)
      if(book.volumeInfo.title
        && book.volumeInfo.authors[0]
        && book.volumeInfo.categories //[0]
        && book.volumeInfo.publishedDate
        && book.volumeInfo.description
        && book.volumeInfo.pageCount
        && book.id
        && book.selfLink
        && book.volumeInfo.imageLinks
        // && (book.volumeInfo.industryIdentifiers[0]["type"] === "isbn_ten")
        // && (book.volumeInfo.industryIdentifiers[1]["type"] === "isbn_thirteen")
         )
           {
        return book
      }
      else {
        console.log("Book is missing keys", book)
      }
    })
  }

  //Book search form submit event listener. Submission will trigger fetch to external Google books api
  onSearchSubmit = (event) => {
    event.preventDefault();
    //save query at time of submission and convert string to be used in query string for external API call
    let submittedQuery = this.state.searchQuery
    let formattedQuery = this.formatForFetch(submittedQuery)
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${formattedQuery}`)
    //&maxResults=40
      .then(response => response.json())
      //update state with the fetchedBooks and reset the searchQuery input field
      // .then((data) => console.log(data))
      .then(fetchedBookArray => this.filterMissingKeys(fetchedBookArray.items))
      .then(fetchedBookArray => this.setState({
        fetchedBookArray: fetchedBookArray,
        searchQuery: ""
      }))
      // //Push users to the search result page after successfully fetching and setState
      .then(() => this.props.history.push(`/search/${formattedQuery}`))
      .catch(error => {
        alert("An error occurred. Please search for something else", error)
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
    return allBooks.find(book => book.google_id === selectedBook.google_id)
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
        // isbn_ten: selectedBook.volumeInfo.industryIdentifiers[1].identifier,
        // isbn_thirteen: selectedBook.volumeInfo.industryIdentifiers[0].identifier,
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
    console.log("Fetched books", this.state.fetchedBookArray)
    return (
      <div className="App div--app">
        <Route path="/" render={(routerProps) => <NavBar
          {...routerProps}
          logoutUser={this.logoutUser}
          searchQuery={this.state.searchQuery}
          currentUser={this.state.currentUser}
          onSearchQueryChange={this.onSearchQueryChange}
          onSearchSubmit={this.onSearchSubmit} />}
        />
        <Switch>
            <Route path="/profile" render={(routerProps) => <ProfileContainer
              routerProps={routerProps}
              currentUser={this.state.currentUser}
              loginUser={this.loginUser}
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
          <Route path="/login" render={(routerProps) => <LoginContainer
              routerProps={routerProps}
              currentUser={this.state.currentUser}
              loginUser={this.loginUser}
              collectionsArray={this.state.collectionsArray}
              onCollectionItemClick={this.onCollectionItemClick}
              onNewCollectionInputChange={this.onNewCollectionInputChange}
              onNewCollectionInputSubmit={this.onNewCollectionInputSubmit}
            />}/>
          <Route path="/register" render={(routerProps) => <RegisterContainer
              routerProps={routerProps}
              currentUser={this.state.currentUser}
              collectionsArray={this.state.collectionsArray}
            />}/>
          <Route path="/about" component={AboutContainer} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
