import { ActionType } from '../action';
import { arrangeOffersByCity, adaptOffersKeys, adaptCommentsKeys } from '../../util';
import { CITIES_LIST } from '../../const';

const initialState = {
  offers: [],
  offersNearby: [],
  isOffersLoaded: false,
  room: {},
  isRoomLoaded: false,
  comments: [],
};

const appData = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
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
        comments: adaptCommentsKeys(action.comments),
      };
    case ActionType.LOAD_ROOM:
      return {
        ...state,
        room: adaptOffersKeys([action.room])[0],
        isRoomLoaded: true,
      };
    default:
      return state;
  }
};


export { appData };
