// @flow
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import SiteLayout from '../SiteLayout';
import GitHubRepos from '../GitHubRepos';

const App = ({
  client
}: any) => (
  <ApolloProvider client={client}>
    <SiteLayout>
      <GitHubRepos />
    </SiteLayout>
  </ApolloProvider>
);

export default App;
