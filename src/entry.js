import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

require('offline-plugin/runtime').install();

const node = document.getElementById('root');

render(<App />, node);
