import React, { Component } from 'react';
import './App.css';

import { Route, Switch, withRouter } from 'react-router-dom';

//Containers
import CollectionContainer from "./components/containers/CollectionContainer"
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
  }

  componentDidMount(){
    fetch(`http://localhost:3000/api/v1/users/${this.state.currentUser.id}/collections`)
      .then(response => response.json())
      .then(collectionsArray => this.setState({collectionsArray}))
  }

  onSearchQueryChange = (event) => {
    this.setState({ searchQuery: event.target.value })
  }

  onSearchSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted query:", this.state.searchQuery)
  }

  onCollectionItemClick = (event, selectedCollection) => {
    console.log("You clicked a collection", selectedCollection)
    this.setState({selectedCollection: selectedCollection})
    this.props.history.push(`/collections/${selectedCollection.id}`)
  }

  onCollectionCardClick = (event, selectedCard) => {
    console.log("You clicked a collection card", selectedCard);

  }

  render() {
    return (
      <div className="App">
        <Route path="/" render={(routerProps) => <NavBar
          {...routerProps}
          searchQuery={this.state.searchQuery}
          onSearchQueryChange={this.onSearchQueryChange}
          onSearchSubmit={this.onSearchSubmit} />}/>
          <Switch>
              <Route path="/profile" render={(routerProps) => <ProfileContainer
                routerProps={routerProps}
                currentUser={this.state.currentUser}
                collectionsArray={this.state.collectionsArray}
                onCollectionItemClick={this.onCollectionItemClick}
             />}/>
            </Switch>

        <Route path ={`/collections/:id`} render={(routerProps) => {
                let collectionId = routerProps.match.params.id;
                return <CollectionContainer
                          routerProps={routerProps}
                          collectionId={collectionId}
                          onCollectionCardClick={this.onCollectionCardClick}
                          currentUser={this.state.currentUser}
                          selectedCollection={this.state.selectedCollection}
                          />
              }} />

      </div>
    );
  }
}

export default withRouter(App);
