import { createReducer } from '@reduxjs/toolkit';
import { updateOfferFavoriteStatus } from '../../util';
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
      state.offers = action.payload;
      state.isOffersLoaded = true;
    })
    .addCase(loadOffersNearby, (state, action) => {
      state.offersNearby = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(loadRoom, (state, action) => {
      state.room = action.payload;
      state.isRoomLoaded = true;
    })
    .addCase(loadFavorites, (state, action) => {
      state.favorites = action.payload;
      state.isFavoritesLoaded = true;
    })
    .addCase(updateOffer, (state, action) => {
      state.isFavoritesLoaded = false;
      state.offers = updateOfferFavoriteStatus(state.offers, action.payload);
    })
    .addCase(resetOffers, (state) => {
      state.favorites = [];
    });
});

export { appData };
