import { createAction } from '@reduxjs/toolkit';

export const ActionType = {
  CHANGE_CITY: 'city/changeCity',
  SORT_OFFERS: 'offers/sortOffers',
  LOAD_OFFERS: 'data/loadOffers',
  LOAD_ROOM: 'data/loadRoom',
  LOAD_OFFERS_NEARBY: 'data/loadOffersNearby',
  LOAD_COMMENTS: 'data/loadComments',
  LOAD_FAVORITES: 'data/loadFavorites',
  UPDATE_OFFER: 'data/updateOffer',
  RESET_OFFERS: 'data/resetOffers',
  REQUIRED_AUTHORIZATION: 'user/requiredAuthorization',
  LOGIN: 'user/login',
  LOGOUT: 'user/logout',
  SET_ERROR: 'error/setError',
  RESET_ERROR: 'error/resetError',
  SET_COMMENT_ERROR: 'error/setCommentError',
  RESET_COMMENT_ERROR: 'error/resetCommentError',
};

export const changeCity = createAction(ActionType.CHANGE_CITY, (city) => ({
  payload: city,
}));

export const sortOffers = createAction(ActionType.SORT_OFFERS, (sortBy) => ({
  payload: sortBy,
}));

export const loadOffers = createAction(ActionType.LOAD_OFFERS, (offers) => ({
  payload: offers,
}));

export const loadOffersNearby = createAction(ActionType.LOAD_OFFERS_NEARBY, (offersNearby) => ({
  payload: offersNearby,
}));

export const loadComments = createAction(ActionType.LOAD_COMMENTS, (comments) => ({
  payload: comments,
}));

export const loadRoom = createAction(ActionType.LOAD_ROOM, (room) => ({
  payload: room,
}));

export const loadFavorites = createAction(ActionType.LOAD_FAVORITES, (favorites) => ({
  payload: favorites,
}));

export const updateOffer = createAction(ActionType.UPDATE_OFFER, (offerId) => ({
  payload: offerId,
}));

export const requireAuthorization = createAction(ActionType.REQUIRED_AUTHORIZATION, (status) => ({
  payload: status,
}));

export const login = createAction(ActionType.LOGIN, (user) => ({
  payload: user,
}));

export const logout = createAction(ActionType.LOGOUT);

export const setError = createAction(ActionType.SET_ERROR, (error) => ({
  payload: error,
}));

export const resetError = createAction(ActionType.RESET_ERROR);

export const setCommentError = createAction(ActionType.SET_COMMENT_ERROR, (error) => ({
  payload: error,
}));

export const resetCommentError = createAction(ActionType.RESET_COMMENT_ERROR);

export const resetOffers = createAction(ActionType.RESET_OFFERS);
