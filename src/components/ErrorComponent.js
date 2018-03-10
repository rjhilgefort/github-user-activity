import React from 'react';
import {
  defaultProps,
} from 'recompose';
import {
  pipe,
} from 'ramda';

const enhance = pipe(
  defaultProps({
    error: new Error('An unknown error occurred'),
  }),
);
const ErrorComponent = (({
  error,
}) => (
  <div>
    <h1>Fail Whale</h1>
    <p>{error.message}</p>
  </div>
));

export default enhance(ErrorComponent);
