import { ActionType } from './action';
import { getOffersByCity, arrangeOffersByCity, sortOffers, adaptKeys } from '../util';
import { CITIES_LIST, SortByOptions, AuthorizationStatus } from '../const';

const initialState = {
  city: CITIES_LIST.PARIS,
  offers: [],
  sortBy: SortByOptions.POPULAR,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  isOffersLoaded: false,
  user: localStorage.getItem('user') ?? '',
  error: '',
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
        offers: arrangeOffersByCity(adaptKeys(action.offers), CITIES_LIST.PARIS),
        isOffersLoaded: true,
      };
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.status,
      };
    case ActionType.LOGIN:
      return {
        ...state,
        user: action.user,
        error: '',
      };
    case ActionType.LOGOUT:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        user: '',
      };
    case ActionType.SET_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case ActionType.RESET_ERROR:
      return {
        ...state,
        error: '',
      };
    default:
      return state;
  }

};


export { reducer };
