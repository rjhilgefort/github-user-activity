import React from 'react';
import { Label } from 'semantic-ui-react';

const LanguageLabel = ({
  name,
  color
}: {
  name: String,
  color: String,
}) => (
  <Label
    style={{
      background: color,
      color: 'white',
      marginTop: '2px',
      marginBottom: '2px',
    }}
  >
    {name}
  </Label>
);

export default LanguageLabel;
