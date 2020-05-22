
import React from 'react';
import Icon from './Icon';

export default function Square(props) {
  return (
    <Icon
      {...props}
    >
      <g transform="matrix(.48 0 0 .48 0 0)">
        <path fill="#000" d="M44 1h-38c-2.757 0-5 2.243-5 5v38c0 2.757 2.243 5 5 5h38c2.757 0 5-2.243 5-5v-38c0-2.757-2.243-5-5-5Zm3 43c0 1.654-1.346 3-3 3h-38c-1.654 0-3-1.346-3-3v-38c0-1.654 1.346-3 3-3h38c1.654 0 3 1.346 3 3v38Z"></path>
      </g>
    </Icon>
  );
}
