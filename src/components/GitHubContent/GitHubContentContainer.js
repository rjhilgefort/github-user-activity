import { gql, graphql } from 'react-apollo';
import { branch, renderComponent } from 'recompose';
import {
  pathOr, applySpec, compose, path, propEq, propSatisfies,
} from 'ramda';
import {
  notNil,
} from '../../utils';
import Loading from '../Loading';
import ErrorComponent from '../ErrorComponent';
import GitHubContent from './GitHubContent';

// https://developer.github.com/v4/
// TODO: Allow user to be determined from field
const GET_GITHUB_REPOS = gql`
  query GetGitHubRepos {
    user(login: "rjhilgefort") {
      login
      repositoriesContributedTo(
        first: 25,
        includeUserRepositories: true,
        orderBy: {
          direction: DESC,
          field: PUSHED_AT 
        }
      ) {
        nodes {
          url,
          name,
          nameWithOwner,
          owner {
            login 
          },
          primaryLanguage {
            name,
            color
          }
          languages(first: 25) {
            nodes {
              name,
              color
            }
          },
        }
      }
    }
  }
`;

export default compose(
  graphql(GET_GITHUB_REPOS, {
    props: applySpec({
      error: path(['data', 'error']),
      loading: pathOr(false, ['data', 'loading']),
      repos: pathOr([], ['data', 'user', 'repositoriesContributedTo', 'nodes']),
      user: path(['data', 'user', 'login']),
    })
  }),
  branch(
    propEq('loading', true),
    renderComponent(Loading)
  ),
  branch(
    propSatisfies(notNil, 'error'),
    renderComponent(ErrorComponent),
  )
)(GitHubContent);
