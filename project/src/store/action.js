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

export const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    city,
  }),
  selectOffers: (city) => ({
    type: ActionType.SELECT_OFFERS,
    city,
  }),
  sortOffers: (sortBy) => ({
    type: ActionType.SORT_OFFERS,
    sortBy,
  }),
  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    offers,
  }),
  loadOffersNearby: (offersNearby) => ({
    type: ActionType.LOAD_OFFERS_NEARBY,
    offersNearby,
  }),
  loadComments: (comments) => ({
    type: ActionType.LOAD_COMMENTS,
    comments,
  }),
  loadRoom: (room) => ({
    type: ActionType.LOAD_ROOM,
    room,
  }),
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    status,
  }),
  login: (user) => ({
    type: ActionType.LOGIN,
    user,
  }),
  logout: () => ({
    type: ActionType.LOGOUT,
  }),
  setError: (error) => ({
    type: ActionType.SET_ERROR,
    error,
  }),
  resetError: () => ({
    type: ActionType.RESET_ERROR,
  }),
};
