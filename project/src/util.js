import { SortByOptions } from './const';

const offers = [];
const offersByCity = {};

offers.forEach((offer) => {
  if (!offersByCity[offer.city.name]) {
    offersByCity[offer.city.name] = [offer];
  } else {
    offersByCity[offer.city.name].push(offer);
  }
});

export const convertDateToMonthAndDate = (date) => (
  new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
);

export const capitalize = (word) => (
  word && word[0].toUpperCase() + word.slice(1)
);

export const calculateRatingPercent = (rating) => (
  `${(rating * 20)}%`
);

export const getOffersByCity = (city) => (
  offersByCity[city.name] ? offersByCity[city.name] : []
);

export const selectPluralFormForNoun = (value, singleForm, pluralForm) => (
  value === 1 ? singleForm : pluralForm
);

export const sortOffers = (values, sortBy, city) => {
  const shallowCopy = values.slice();
  switch (sortBy) {
    case SortByOptions.POPULAR:
      return getOffersByCity(city);
    case SortByOptions.PRICE_LOW:
      return shallowCopy.sort((a, b) => a.price - b.price);
    case SortByOptions.PRICE_HIGH:
      return shallowCopy.sort((a, b) => b.price - a.price);
    case SortByOptions.TOP_RATED:
      return shallowCopy.sort((a, b) => b.rating - a.rating);
    default:
      return shallowCopy;
  }
};
