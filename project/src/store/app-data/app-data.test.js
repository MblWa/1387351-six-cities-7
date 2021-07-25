import { ActionType } from '../action';
import { appData } from './app-data';

describe('Reducer: App Data', () => {
  it('without additional parameters should return initial state', () => {
    expect(appData(undefined, {}))
      .toEqual({
        offers: [],
        offersNearby: [],
        isOffersLoaded: false,
        room: {},
        favorites: [],
        isFavoritesLoaded: false,
        isRoomLoaded: false,
        comments: [],
      });
  });

  it('should set offers', () => {
    const state = {
      isOffersLoaded: false,
      offers: [],
    };

    const setChangeOffers = {
      type: ActionType.LOAD_OFFERS,
      payload: [{}, {}, {}],
    };

    expect(appData(state, setChangeOffers))
      .toEqual({
        isOffersLoaded: true,
        offers: [{}, {}, {}],
      });
  });

  it('should set offers nearby', () => {
    const state = {
      offersNearby: [],
    };

    const setChangeOffersNearBy = {
      type: ActionType.LOAD_OFFERS_NEARBY,
      payload: [{}, {}, {}],
    };

    expect(appData(state, setChangeOffersNearBy))
      .toEqual({
        offersNearby: [{}, {}, {}],
      });
  });


  it('should set comments', () => {
    const state = {
      comments: [],
    };

    const setChangeComments = {
      type: ActionType.LOAD_COMMENTS,
      payload: [{}, {}, {}],
    };

    expect(appData(state, setChangeComments))
      .toEqual({
        comments: [{}, {}, {}],
      });
  });

  it('should set room', () => {
    const state = {
      room: {},
      isRoomLoaded: false,
    };

    const setChangeRoom = {
      type: ActionType.LOAD_ROOM,
      payload: {},
    };

    expect(appData(state, setChangeRoom))
      .toEqual({
        room: {},
        isRoomLoaded: true,
      });
  });

  it('should set favorites', () => {
    const state = {
      favorites: [],
      isFavoritesLoaded: false,
    };

    const setChangeFavorites = {
      type: ActionType.LOAD_FAVORITES,
      payload: [{}, {}, {}],
    };

    expect(appData(state, setChangeFavorites))
      .toEqual({
        favorites: [{}, {}, {}],
        isFavoritesLoaded: true,
      });
  });

  it('should reset offers', () => {
    const state = {
      favorites: [{}, {}, {}],
    };

    const setResetOffers = {
      type: ActionType.RESET_OFFERS,
    };

    expect(appData(state, setResetOffers))
      .toEqual({
        favorites: [],
      });
  });

  it('should update selected offer', () => {
    const wrongId = 4;

    const state = {
      room: {id: 1, isFavorite: true},
      offers: [
        {id: 1, isFavorite: true},
        {id: 2, isFavorite: false},
      ],
      offersNearby: [
        {id: 1, isFavorite: true},
        {id: 2, isFavorite: false},
      ],
    };

    const setUpdateOfferToFav = {
      type: ActionType.UPDATE_OFFER,
      payload: state.offers[0].id,
    };

    expect(appData(state, setUpdateOfferToFav))
      .toEqual({
        isFavoritesLoaded: false,
        room: {id: 1, isFavorite: false},
        offers: [
          {id: 1, isFavorite: false},
          {id: 2, isFavorite: false},
        ],
        offersNearby: [
          {id: 1, isFavorite: false},
          {id: 2, isFavorite: false},
        ],
      });

    const setUpdateOfferToUnfav = {
      type: ActionType.UPDATE_OFFER,
      payload: state.offers[1].id,
    };

    expect(appData(state, setUpdateOfferToUnfav))
      .toEqual({
        isFavoritesLoaded: false,
        room: {id: 1, isFavorite: true},
        offers: [
          {id: 1, isFavorite: true},
          {id: 2, isFavorite: true},
        ],
        offersNearby: [
          {id: 1, isFavorite: true},
          {id: 2, isFavorite: true},
        ],
      });

    const setUpdateOfferByWrongId = {
      type: ActionType.UPDATE_OFFER,
      payload: wrongId,
    };

    expect(appData(state, setUpdateOfferByWrongId))
      .toEqual({
        isFavoritesLoaded: false,
        room: {id: 1, isFavorite: true},
        offers: [
          {id: 1, isFavorite: true},
          {id: 2, isFavorite: false},
        ],
        offersNearby: [
          {id: 1, isFavorite: true},
          {id: 2, isFavorite: false},
        ],
      });
  });
});
