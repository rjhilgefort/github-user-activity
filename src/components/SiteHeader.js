import React from 'react';
import {
  Menu, Container,
} from 'semantic-ui-react';
import MenuLogo from './MenuLogo';

const SiteHeader = () => (
  <Menu fixed='top' inverted>
    <Container>
      <Menu.Item as='a' header>
        <MenuLogo />
        GitHub User Activity
      </Menu.Item>
    </Container>
  </Menu>
)

export default SiteHeader;
