import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import reviews from './mocks/reviews';
import offers from './mocks/offers';

ReactDOM.render(
  <React.StrictMode>
    <App
      offers={offers}
      reviews={reviews}
    />
  </React.StrictMode>,
  document.getElementById('root'));
