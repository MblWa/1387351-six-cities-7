import React from 'react';
import PropTypes from 'prop-types';

function Star({ index, title, onChange, isDisabled, isChecked }) {

  return (
    <>
      <input
        className="form__rating-input visually-hidden"
        name="rating"
        value={index}
        id={`${index}-stars`}
        type="radio"
        onChange={onChange}
        data-testid="rating-input"
        disabled={isDisabled}
        checked={isChecked}
      />
      <label
        htmlFor={`${index}-stars`}
        className="reviews__rating-label form__rating-label"
        title={title}
        data-testid="rating-label"
      >
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
  isDisabled: PropTypes.bool.isRequired,
  isChecked: PropTypes.bool.isRequired,
};

export default Star;
