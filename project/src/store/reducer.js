import { ActionType } from './action';
import { getOffersByCity, arrangeOffersByCity, sortOffers, sortComments, adaptOffersKeys, adaptCommentsKeys, adaptUserKeys } from '../util';
import { CITIES_LIST, SortByOptions, AuthorizationStatus } from '../const';

const userLocalStorage = JSON.parse(localStorage.getItem('user')) ?? {};

const initialState = {
  city: CITIES_LIST.PARIS,
  offers: [],
  room: {},
  comments: [],
  offersNearby: [],
  sortBy: SortByOptions.POPULAR,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  isOffersLoaded: false,
  isRoomLoaded: false,
  user: {
    email: userLocalStorage.email ?? '',
    id: userLocalStorage.id ?? null,
    name: userLocalStorage.name ?? '',
    avatarUrl: userLocalStorage.avatar_url ?? '',
    isPro: userLocalStorage.is_pro ?? false,
    loginError: '',
  },
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
        offers: arrangeOffersByCity(adaptOffersKeys(action.offers), CITIES_LIST.PARIS),
        isOffersLoaded: true,
      };
    case ActionType.LOAD_OFFERS_NEARBY:
      return {
        ...state,
        offersNearby: adaptOffersKeys(action.offersNearby),
      };
    case ActionType.LOAD_COMMENTS:
      return {
        ...state,
        comments: sortComments(adaptCommentsKeys(action.comments)),
      };
    case ActionType.LOAD_ROOM:
      return {
        ...state,
        room: adaptOffersKeys([action.room])[0],
        isRoomLoaded: true,
      };
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.status,
      };
    case ActionType.LOGIN:
      return {
        ...state,
        user: {
          ...adaptUserKeys(action.user),
          loginError: '',
        },
      };
    case ActionType.LOGOUT:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        user: {
          email: '',
          id: null,
          name: '',
          avatarUrl: '',
          isPro: false,
          loginError: '',
        },
      };
    case ActionType.SET_ERROR:
      return {
        ...state,
        user: {
          ...state.user,
          loginError: action.error,
        },
      };
    case ActionType.RESET_ERROR:
      return {
        ...state,
        user: {
          ...state.user,
          loginError: '',
        },
      };
    default:
      return state;
  }

};


export { reducer };
