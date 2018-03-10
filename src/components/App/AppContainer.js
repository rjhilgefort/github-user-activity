import ApolloClient, { createNetworkInterface } from 'apollo-client';
import {
  objOf, construct, pipe, propSatisfies,
} from 'ramda';
import {
  get, is, concat, maybeToNullable, allPass, map,
} from 'sanctuary';
import {
  withProps, branch, renderComponent,
} from 'recompose';
import {
  notNil, notEmpty,
} from '../../utils';
import App from './App';
import ErrorComponent from '../ErrorComponent';

const ErrorMissingToken = withProps({
  error: new Error('Error setting up GitHub API client: Missing `GH_AUTH` token')
})(ErrorComponent);

const enhance = pipe(
  withProps({
    client: pipe(
      get(allPass([
        is(String),
        notEmpty,
      ]), 'REACT_APP_GH_AUTH'),
      map(concat('Bearer ')),
      map((x) => ({
        uri: 'https://api.github.com/graphql',
        opts: {
          headers: {
            "Authorization": x,
          }
        }
      })),
      map(createNetworkInterface),
      map(objOf('networkInterface')),
      map(construct(ApolloClient)),
      maybeToNullable,
    )(process.env)
  }),
  branch(
    propSatisfies(notNil, 'client'),
    renderComponent(ErrorMissingToken), // TODO: Presumes reason all the time
  )
);

export default enhance(App);
