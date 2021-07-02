import { createReducer } from '@reduxjs/toolkit';
import { arrangeOffersByCity, adaptOffersKeys, adaptCommentsKeys } from '../../util';
import { loadComments, loadOffers, loadOffersNearby, loadRoom } from '../action';

const initialState = {
  offers: [],
  offersNearby: [],
  isOffersLoaded: false,
  room: {},
  isRoomLoaded: false,
  comments: [],
};

const appData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = arrangeOffersByCity(adaptOffersKeys(action.payload));
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
    });
});

export { appData };
