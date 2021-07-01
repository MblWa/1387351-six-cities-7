export const ActionType = {
  CHANGE_CITY: 'city/changeCity',
  SELECT_OFFERS: 'city/selectOffers',
  SORT_OFFERS: 'offers/sortOffers',
  LOAD_OFFERS: 'data/loadOffers',
  LOAD_ROOM: 'data/loadRoom',
  LOAD_OFFERS_NEARBY: 'data/loadOffersNearby',
  LOAD_COMMENTS: 'data/loadComments',
  REQUIRED_AUTHORIZATION: 'user/requiredAuthorization',
  LOGIN: 'user/login',
  LOGOUT: 'user/logout',
  SET_ERROR: 'error/setError',
  RESET_ERROR: 'error/resetError',
};

export const changeCity = (city) => ({
  type: ActionType.CHANGE_CITY,
  city,
});

export const selectOffers = (city) => ({
  type: ActionType.SELECT_OFFERS,
  city,
});

export const sortOffers = (sortBy) => ({
  type: ActionType.SORT_OFFERS,
  sortBy,
});

export const loadOffers = (offers) => ({
  type: ActionType.LOAD_OFFERS,
  offers,
});

export const loadOffersNearby = (offersNearby) => ({
  type: ActionType.LOAD_OFFERS_NEARBY,
  offersNearby,
});

export const loadComments = (comments) => ({
  type: ActionType.LOAD_COMMENTS,
  comments,
});

export const loadRoom = (room) => ({
  type: ActionType.LOAD_ROOM,
  room,
});

export const requireAuthorization = (status) => ({
  type: ActionType.REQUIRED_AUTHORIZATION,
  status,
});

export const login = (user) => ({
  type: ActionType.LOGIN,
  user,
});

export const  logout = () => ({
  type: ActionType.LOGOUT,
});

export const  setError = (error) => ({
  type: ActionType.SET_ERROR,
  error,
});

export const  resetError = () => ({
  type: ActionType.RESET_ERROR,
});
