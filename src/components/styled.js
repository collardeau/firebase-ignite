import React from 'react';

export const Button = props => (
  <button
    style={{
      display: 'block',
      padding: '0.5em 0.8em',
      fontSize: '1.2em',
      margin: '0.8em 0',
      backgroundColor: '#666',
      border: 'none',
      minWidth: '100px',
      color: '#fff'
    }}
    {...props}
  />
);

export const Input = props => (
  <input
    style={{
      display: 'block',
      width: '89%',
      padding: '0.5em',
      margin: '0.5em 0'
    }}
    {...props}
  />
);
