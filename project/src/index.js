import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
const CARDS_COUNT = 5;

ReactDOM.render(
  <React.StrictMode>
    <App cardsCount={CARDS_COUNT} />
  </React.StrictMode>,
  document.getElementById('root'));
