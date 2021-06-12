import React from 'react';
import PropTypes from 'prop-types';

function Star({ index, title, onChange }) {

  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={index}
        id={`${index}-stars`}
        type="radio"
        onChange={onChange}
      />
      <label htmlFor={`${index}-stars`} className="reviews__rating-label form__rating-label" title={title}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

Star.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Star;