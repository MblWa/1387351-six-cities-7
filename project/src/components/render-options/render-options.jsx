import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortOffers } from '../../store/action';
import { SortByOptions } from '../../const';
import { getSortBy } from '../../store/ui-interaction/selectors';

function RenderOptions() {
  const selectedSortBy = useSelector(getSortBy);
  const dispatch = useDispatch();
  const [isClosed, setIsClosed] = useState(true);

  const onOptionSelected = (evt) => dispatch(sortOffers(evt.target.textContent));

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

export default RenderOptions;
