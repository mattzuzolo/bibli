import React, { Component } from 'react';

class AboutContainer extends Component {
  render(){
    return(
      <div className="container div--about-container">
        <h1>Bibli was created by <a href="https://mattzuzolo.github.io/">Matt Zuzolo</a>.</h1>
        <p>You can view the code on my <a href="https://www.github.com/mattzuzolo">GitHub page</a>, or directly at the <a href="https://github.com/mattzuzolo/bibli">repository</a>.</p>
        <p className="source-credit">This project was made using data from <a href="https://developers.google.com/books/">Google Books.</a></p>
        <br/>
        <p><strong>This project is still in progess! <a href="https://github.com/mattzuzolo/bibli/commits/master">Click Here</a> to see my latest commits</strong>.</p>
        <p><strong>Project Roadmap:</strong></p>
        <ul>
          <li>Add Authentication with <a href="https://github.com/plataformatec/devise">Devise</a></li>
          <li>Develop additional functionality related to managing and organizing user libraries</li>
          <li>Improve book search functionality</li>
          <li>Continue improving performance, security, design and overall code quality</li>
          <li>Expand social features</li>
        </ul>
      </div>
    );
  }
}

export default AboutContainer;
