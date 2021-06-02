import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main';

function App({ cardsCount }) {
  return <Main cardsCount={cardsCount}/>;
}

App.propTypes = {
  cardsCount: PropTypes.number.isRequired,
};

export default App;
