import { CITIES_LIST, SortByOptions } from '../../const';
import { ActionType } from '../action';
import { uiInteraction } from './ui-interaction';

describe('Reducer: UI Interactions', () => {
  it('without additional parameters should return initial state', () => {
    expect(uiInteraction(undefined, {}))
      .toEqual({
        city: CITIES_LIST.PARIS,
        sortBy: SortByOptions.POPULAR,
      });
  });

  it('should change city and set default sorting option', () => {
    const state = {
      city: CITIES_LIST.PARIS,
      sortBy: SortByOptions.PRICE_HIGH,
    };

    const setChangeCity = {
      type: ActionType.CHANGE_CITY,
      payload: CITIES_LIST.COLOGNE,
    };

    expect(uiInteraction(state, setChangeCity))
      .toEqual({
        city: CITIES_LIST.COLOGNE,
        sortBy: SortByOptions.POPULAR,
      });
  });

  it('should change sorting option', () => {
    const state = {
      sortBy: SortByOptions.PRICE_HIGH,
    };

    const setChangeSortBy = {
      type: ActionType.SORT_OFFERS,
      payload: SortByOptions.PRICE_LOW,
    };

    expect(uiInteraction(state, setChangeSortBy))
      .toEqual({
        sortBy: SortByOptions.PRICE_LOW,
      });
  });
});
