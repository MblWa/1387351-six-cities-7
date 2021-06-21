import { ActionType } from './action';

const initialStateForCity = {
  city: {
    location: {
      latitude: null,
      longitude: null,
      zoom: null,
    },
    name: '',
  },
  offers: [],
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
        offers: getOffersByCity(state.city),
      };
    default:
      return state;
  }

};


export { reducer };
