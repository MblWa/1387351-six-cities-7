import { ActionType } from './action';
import { getOffersByCity } from '../util';
import { CITIES_LIST } from '../const';
import offers from '../mocks/offers';

const initialStateForCity = {
  city: CITIES_LIST.PARIS,
  offers: getOffersByCity(CITIES_LIST.PARIS, offers),
};

const reducer = (state = initialStateForCity, action) => {
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
        offers: getOffersByCity(action.city, offers),
      };
    default:
      return state;
  }

};


export { reducer };
