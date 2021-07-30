import React from 'react';
import PropTypes from 'prop-types';

function Alert({ errorText, onClick }) {
  return (
    <div
      style={{
        backgroundColor: 'red',
        color: 'white',
        textAlign:
        'center',
        zIndex: '1000',
        position: 'fixed',
        top: '80px',
        width: '500px',
      }}
      onClick={onClick}
    >
      <p>{errorText}</p>
    </div>
  );
}

Alert.propTypes = {
  onClick: PropTypes.func.isRequired,
  errorText: PropTypes.string.isRequired,
};

export default Alert;
