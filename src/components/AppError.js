// @flow
import React from 'react';
import { withProps } from 'recompose';
import SiteLayout from './SiteLayout';
import ErrorComponent from './ErrorComponent';

const ghAuthError = new Error('Error setting up GitHub API client: Missing `GH_AUTH` token');
const ErrorMissingToken = withProps({ error: ghAuthError })(ErrorComponent);

// TODO: This should take an `Error` isntance
const AppError = () => (
  <SiteLayout>
    <ErrorMissingToken />
  </SiteLayout>
);

export default AppError;
