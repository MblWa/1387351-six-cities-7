import { ActionType } from './action';
import { getOffersByCity, sortOffers } from '../util';
import { CITIES_LIST, SortByOptions } from '../const';

const initialState = {
  city: CITIES_LIST.PARIS,
  offers: getOffersByCity(CITIES_LIST.PARIS),
  sortBy: SortByOptions.POPULAR,
};

const reducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        city: action.city,
      };
    case ActionType.SELECT_OFFERS:
      return {
        ...state,
        offers: getOffersByCity(action.city),
        sortBy: initialState.sortBy,
      };
    case ActionType.SORT_OFFERS:
      return {
        ...state,
        sortBy: action.sortBy,
        offers: sortOffers(state.offers, action.sortBy, state.city),
      };
    default:
      return state;
  }

};


export { reducer };
