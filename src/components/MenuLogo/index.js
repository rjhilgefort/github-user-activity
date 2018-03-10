// @flow
import React from 'react';
import {
  withProps,
} from 'recompose';
import {
  Image,
} from 'semantic-ui-react';
import { mergeProps } from '../../hoc';
import github from './github.png';
import plus from './plus-red.png';
import react from './react.png';

const MenuImage = mergeProps({
  size: 'mini',
  style: { marginRight: '1.5em' }
})(Image);

const GitHubMenuImage = withProps({ src: github })(MenuImage);
const PlusMenuImage = mergeProps({
  src: plus,
  style: { width: '15px' },
})(MenuImage);
const ReactMenuImage = withProps({ src: react })(MenuImage);

const MenuLogo = () => [
  <GitHubMenuImage />,
  <PlusMenuImage />,
  <ReactMenuImage />
];

export default MenuLogo;
