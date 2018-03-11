// @flow
import React from 'react';
import { withProps } from 'recompose';
import {
  Segment,
  Header,
} from 'semantic-ui-react';

const HeaderCenter = withProps({
  as: 'h2',
  textAlign: 'center',
  color: 'green',
})(Header);

const UserHeader = ({
  user,
}: {
  user: String,
}) => (
  <Segment>
    <HeaderCenter>{user}</HeaderCenter>
  </Segment>
);

export default UserHeader;
