// @flow
import React from 'react';
import { Container } from 'semantic-ui-react';
import SiteHeader from './SiteHeader';

const SiteLayout = ({
  children,
}: {
  children: React$Element<any>,
}) => (
  <div>
    <SiteHeader />
    <Container text style={{ marginTop: '6em' }}>
      {children}
    </Container>
  </div>
);

export default SiteLayout;
