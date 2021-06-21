export const ActionType = {
  CHANGE_CITY: 'city/changeCity',
  SELECT_OFFERS: 'city/selectOffers',
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
};
