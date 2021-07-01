import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SortByOptions } from '../../const';
import { sortOffers } from '../../store/action';

function RenderOptions({ onOptionSelected, selectedSortBy }) {
  const [isClosed, setIsClosed] = useState(true);

  return (
    <form
      className="places__sorting"
      action="#"
      method="get"
    >
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex="0"
        onClick={() => {
          setIsClosed(!isClosed);
        }}
      >
        {selectedSortBy}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={isClosed ? 'places__options places__options--custom' : 'places__options places__options--custom places__options--opened'}
      >
        {Object.values(SortByOptions).map((option) => (
          <li
            key={option}
            className={selectedSortBy === option ? 'places__option places__option--active' : 'places__option'}
            tabIndex="0"
            onClick={(evt) => {
              setIsClosed(!isClosed);
              onOptionSelected(evt);
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}

const mapStateToProps = (state) => ({
  selectedSortBy: state.sortBy,
});

const mapDispatchToProps = (dispatch) => ({
  onOptionSelected(evt) {
    dispatch(sortOffers(evt.target.textContent));
  },
});

RenderOptions.propTypes = {
  onOptionSelected: PropTypes.func.isRequired,
  selectedSortBy: PropTypes.string.isRequired,
};

export { RenderOptions };
export default connect(mapStateToProps, mapDispatchToProps)(RenderOptions);
