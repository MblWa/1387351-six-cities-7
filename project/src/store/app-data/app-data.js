import { createReducer } from '@reduxjs/toolkit';
import { adaptOffersKeys, adaptCommentsKeys, updateOfferFavoriteStatus } from '../../util';
import { loadComments, loadOffers, loadOffersNearby, loadRoom, loadFavorites, updateOffer, resetOffers } from '../action';

const initialState = {
  offers: [],
  offersNearby: [],
  isOffersLoaded: false,
  room: {},
  favorites: [],
  isFavoritesLoaded: false,
  isRoomLoaded: false,
  comments: [],
};

const appData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = adaptOffersKeys(action.payload);
      state.isOffersLoaded = true;
    })
    .addCase(loadOffersNearby, (state, action) => {
      state.offersNearby = adaptOffersKeys(action.payload);
    })
    .addCase(loadComments, (state, action) => {
      state.comments = adaptCommentsKeys(action.payload);
    })
    .addCase(loadRoom, (state, action) => {
      state.room = adaptOffersKeys([action.payload])[0];
      state.isRoomLoaded = true;
    })
    .addCase(loadFavorites, (state, action) => {
      state.favorites = adaptOffersKeys(action.payload);
      state.isFavoritesLoaded = true;
    })
    .addCase(updateOffer, (state, action) => {
      state.isFavoritesLoaded = false;
      state.offers = updateOfferFavoriteStatus(state.offers, action.payload.id);
    })
    .addCase(resetOffers, (state) => {
      state.favorites = [];
    });
});

export { appData };
