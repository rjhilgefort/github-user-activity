// @flow
import React from 'react';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import {
  Menu, Container,
} from 'semantic-ui-react';
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
import MenuLogo from './components/MenuLogo';

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
    renderComponent(ErrorMissingToken), // TODO: Presumes reason all the time
  )
);

const App = ({
  client
}: any) => (
  <ApolloProvider client={client}>
    <div>
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item as='a' header>
            <MenuLogo />
            GitHub User Activity
          </Menu.Item>
        </Container>
      </Menu>
      <Container text style={{ marginTip: '7em' }}>
        <GitHubRepos />
      </Container>
    </div>
  </ApolloProvider>
);

export default enhance(App);
