import React from 'react';
import PropTypes from 'prop-types';

function Alert({ onClick }) {
  return (
    <div
      className="container"
      style={{backgroundColor: 'red', color: 'white', textAlign: 'center', zIndex: '100', position: 'absolute', top: '80px'}}
      onClick={onClick}
    >
      <p>Failed to login: bad email or no password provided. Please, try again.</p>
    </div>
  );
}

Alert.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Alert;
