// @flow
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import SiteLayout from '../SiteLayout';
import GitHubContent from '../GitHubContent';

const App = ({
  client
}: any) => (
  <ApolloProvider client={client}>
    <SiteLayout>
      <GitHubContent />
    </SiteLayout>
  </ApolloProvider>
);

export default App;
