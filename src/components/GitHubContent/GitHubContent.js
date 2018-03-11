// @flow
import React from 'react';
import {
  Container,
} from 'semantic-ui-react';
import UserHeader from '../UserHeader';
import RepoTable from '../RepoTable';
import type { Repos } from '../../types';

const GitHubContent = ({
  user,
  repos
}: {
  user: String,
  repos: Repos,
}) => (
  <Container>
    <UserHeader user={user} />
    <RepoTable repos={repos} />
  </Container>
);

export default GitHubContent;
