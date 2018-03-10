// @flow
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import {
  Menu, Container,
} from 'semantic-ui-react';
import GitHubRepos from '../GitHubRepos';
import MenuLogo from '../MenuLogo';

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
      <Container text style={{ marginTop: '6em' }}>
        <GitHubRepos />
      </Container>
    </div>
  </ApolloProvider>
);

export default App;
