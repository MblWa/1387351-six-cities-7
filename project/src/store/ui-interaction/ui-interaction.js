import { ActionType } from '../action';
import { CITIES_LIST, SortByOptions } from '../../const';

const initialState = {
  city: CITIES_LIST.PARIS,
  sortBy: SortByOptions.POPULAR,
};

const uiInteraction = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        city: action.city,
        sortBy: initialState.sortBy,
      };
    case ActionType.SORT_OFFERS:
      return {
        ...state,
        sortBy: action.sortBy,
      };
    default:
      return state;
  }
};


export { uiInteraction };
