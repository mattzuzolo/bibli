import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import './App.css';

//Containers
import CollectionContainer from "./components/containers/CollectionContainer"
import DetailContainer from "./components/containers/DetailContainer"
import ProfileContainer from "./components/containers/ProfileContainer"

//Components
import NavBar from "./components/NavBar"

class App extends Component {
  state = {
    searchQuery: "",
    currentUser: {id: 1, email: "matt@gmail.com", created_at: "2018-09-26T14:40:45.916Z", updated_at: "2018-09-26T14:40:45.916Z"},
    collectionsArray: [],
    selectedCollection: {},
    booksArray: [],
    selectedBook: {},
  }

  componentDidMount(){
    //Fetch the user's collections on mount in order to display the list
    fetch(`http://localhost:3000/api/v1/users/${this.state.currentUser.id}/collections`)
      .then(response => response.json())
      .then(collectionsArray => this.setState({collectionsArray}))
  }

  //Update state to maintain controlled search form
  onSearchQueryChange = (event) => {
    this.setState({ searchQuery: event.target.value })
  }

  //Form submit event listener. Submission will trigger fetch to external Google books api
  onSearchSubmit = (event) => {
    event.preventDefault();
    console.log("YOUR QUERY:", this.state.searchQuery)
    let submittedQuery = this.state.searchQuery
    let submittedQueryWithPlus = submittedQuery.trim().split(' ').join('+');

    fetch(`https://www.googleapis.com/books/v1/volumes?q=conversations+with+friends`)
      .then(response => response.json())
      .then(data => data.items.map(book => console.log(book)))

    this.setState({searchQuery: ""})
  }

  //Event listener on event list so user can visit see the specific collection
  onCollectionItemClick = (event, selectedCollection) => {
    this.setState({selectedCollection: selectedCollection})
    this.props.history.push(`/collections/${selectedCollection.id}`)
  }

  //Event listener for each card in a specific collection so User can get to individual book detail page
  onCollectionCardClick = (event, selectedBook) => {
    this.setState({selectedBook})
    this.props.history.push(`/books/${selectedBook.id}`)
  }

  render() {
    return (
      <div className="App">
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
            />}/>
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
                          currentUser={this.state.currentUser}
                          />
            }}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
