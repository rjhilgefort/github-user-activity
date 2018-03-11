import ApolloClient, { createNetworkInterface } from 'apollo-client';
import {
  objOf, construct, pipe, compose, propSatisfies, isNil,
} from 'ramda';
import {
  get, is, concat, maybeToNullable, allPass, map,
} from 'sanctuary';
import {
  withProps, branch, renderComponent,
} from 'recompose';
import {
  notEmpty,
} from '../../utils';
import AppError from '../AppError';
import App from './App';

const createNetworkInterfaceParams = (
  Authorization: String
) => ({
  uri: 'https://api.github.com/graphql',
  opts: {
    headers: {
      Authorization,
    }
  }
});

const enhance = compose(
  withProps({
    client: pipe(
      get(allPass([
        is(String),
        notEmpty,
      ]), 'REACT_APP_GH_AUTH'),
      map(concat('Bearer ')),
      map(createNetworkInterfaceParams),
      map(createNetworkInterface),
      map(objOf('networkInterface')),
      map(construct(ApolloClient)),
      maybeToNullable,
    )(process.env)
  }),
  branch(
    propSatisfies(isNil, 'client'),
    renderComponent(AppError), // TODO: Presumes reason all the time
  )
);

export default enhance(App);
