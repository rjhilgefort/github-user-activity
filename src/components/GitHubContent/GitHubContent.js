// @flow
import React from 'react';

type Repo = {
  name: String,
};
type Repos = Array<Repo>;
const GitHubContent = ({
  user,
  repos
}: {
  user: String,
  repos: Repos,
}) => (
  <div>
    {console.log(repos[13])}
    <p>
      <b>User:</b> {user}
    </p>
    <ul>
      {repos && repos.map((repo, index) => (
        <li key={index}>
          {repo.name}
        </li>
      ))}
    </ul>
  </div>
);

export default GitHubContent;
