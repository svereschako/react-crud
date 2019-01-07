import React from 'react';
import ReactDOM from 'react-dom';
import Example from './components/example.js';
import element from "./components/Add.js";
import App from "./components/App"; 

ReactDOM.render(
  (<App authenticated="false" />),
  document.getElementById("root")
);