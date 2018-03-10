import React from 'react';
import PropTypes from 'prop-types';

const RepoList = ({ user, repos }) => (
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

RepoList.propTypes = {
  user: PropTypes.string.isRequired,
  repos: PropTypes.array.isRequired
};

export default RepoList;
