import { withProps } from 'recompose';
import { compose, mergeDeepRight } from 'ramda';

export const mergeProps = compose(withProps, mergeDeepRight);
