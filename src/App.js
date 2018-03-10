// @flow
import React from 'react';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import {
  withProps, branch, renderComponent,
} from 'recompose';
import {
  get, is, concat, maybeToNullable, allPass, map,
} from 'sanctuary';
import {
  objOf, construct, pipe, propSatisfies,
} from 'ramda';
import {
  notNil, notEmpty,
} from './utils';
import GitHubRepos from './components/GitHubRepos';
import ErrorComponent from './components/ErrorComponent';
import logo from './logo.svg';
import './App.css';

const ErrorMissingToken = withProps({
  error: new Error('Error setting up GitHub API client: Missing `GH_AUTH` token')
})(ErrorComponent);

const enhance = pipe(
  withProps({
    client: pipe(
      get(allPass([
        is(String),
        notEmpty,
      ]), 'REACT_APP_GH_AUTH'),
      map(concat('Bearer ')),
      map((x) => ({
        uri: 'https://api.github.com/graphql',
        opts: {
          headers: {
            "Authorization": x,
          }
        }
      })),
      map(createNetworkInterface),
      map(objOf('networkInterface')),
      map(construct(ApolloClient)),
      maybeToNullable,
    )(process.env)
  }),
  branch(
    propSatisfies(notNil, 'client'),
    renderComponent(ErrorMissingToken), // TODO: Wrongfully assumes reason
  )
);

const App = ({
  client
}: any) => (
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

export default enhance(App);
