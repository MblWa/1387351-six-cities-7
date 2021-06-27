export const ActionType = {
  CHANGE_CITY: 'city/changeCity',
  SELECT_OFFERS: 'city/selectOffers',
  SORT_OFFERS: 'offers/sortOffers',
  LOAD_OFFERS: 'data/loadOffers',
  REQUIRED_AUTHORIZATION: 'user/requiredAuthorization',
  LOGOUT: 'user/logout',
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
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    status,
  }),
  logout: () => ({
    type: ActionType.LOGOUT,
  }),
};
