import { ActionType } from './action';
import { getOffersByCity, sortOffers } from '../util';
import { CITIES_LIST, SortByOptions, AuthorizationStatus } from '../const';

const initialState = {
  city: CITIES_LIST.PARIS,
  offers: getOffersByCity(CITIES_LIST.PARIS),
  sortBy: SortByOptions.POPULAR,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
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
    case ActionType.LOAD_OFFERS:
      return {
        ...state,
        offers: action.offers,
      };
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.status,
      };
    case ActionType.LOGOUT:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      };
    default:
      return state;
  }

};


export { reducer };
