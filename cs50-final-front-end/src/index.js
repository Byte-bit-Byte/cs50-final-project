import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'tachyons';

const serverURL = 'http://localhost:8080';
ReactDOM.render(<App server={serverURL} />, document.getElementById('root'));