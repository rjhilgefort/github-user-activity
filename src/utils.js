/**
 * This file is intended to expose small, domain agnostic, pure, utility methods.
 * Should *not* contain React/JSX.
 */
import {
  complement, isNil, isEmpty,
} from 'ramda';

// notNil :: Any -> Boolean
export const notNil = complement(isNil);
// notEmpty :: Any -> Boolean
export const notEmpty = complement(isEmpty);
