import React, { Component } from 'react';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import {
  pipe, get, is, concat, fromMaybe, allPass,
} from 'sanctuary';
import {
  objOf, construct, isEmpty, complement,
} from 'ramda';

import GitHubRepos from './components/GitHubRepos';
import logo from './logo.svg';
import './App.css';

const client = pipe([
  get(allPass([
    is(String),
    complement(isEmpty),
  ]), 'REACT_APP_GH_AUTH'),
  fromMaybe(''),
  concat('Bearer '),
  (x) => ({
    uri: 'https://api.github.com/graphql',
    opts: {
      headers: {
        // https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/
        "Authorization": x,
      }
    }
  }),
  createNetworkInterface,
  objOf('networkInterface'),
  construct(ApolloClient),
])(process.env);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <GitHubRepos />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
