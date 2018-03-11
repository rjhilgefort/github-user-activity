// @flow
import React from 'react';
import { withProps } from 'recompose';
import { Image } from 'semantic-ui-react';
import SiteLayout from '../SiteLayout';
import ErrorComponent from '../ErrorComponent';
import failWhaleAsset from './fail-whale.jpg';

const ghAuthError = new Error('Error setting up GitHub API client: Missing `GH_AUTH` token');
const ErrorMissingToken = withProps({ error: ghAuthError })(ErrorComponent);

const FailWhale = withProps({
  src: failWhaleAsset,
  size: 'massive',
  circular: true,
  style: { marginBottom: '2em' }
})(Image);

// TODO: This should take an `Error` isntance
const AppError = () => (
  <SiteLayout>
    <FailWhale />
    <ErrorMissingToken />
  </SiteLayout>
);

export default AppError;
