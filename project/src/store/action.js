export const ActionType = {
  CHANGE_CITY: 'city/changeCity',
  SELECT_OFFERS: 'city/selectOffers',
  SORT_OFFERS: 'offers/sortOffers',
  LOAD_OFFERS: 'data/loadOffers',
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
};
