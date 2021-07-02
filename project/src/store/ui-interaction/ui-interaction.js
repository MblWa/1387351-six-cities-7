import { createReducer } from '@reduxjs/toolkit';
import { CITIES_LIST, SortByOptions } from '../../const';
import { changeCity, sortOffers } from '../action';

const initialState = {
  city: CITIES_LIST.PARIS,
  sortBy: SortByOptions.POPULAR,
};

const uiInteraction = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
      state.sortBy = initialState.sortBy;
    })
    .addCase(sortOffers, (state, action) => {
      state.sortBy = action.payload;
    });
});

export { uiInteraction };
