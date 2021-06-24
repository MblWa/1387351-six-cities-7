export const convertDateToMonthAndDate = (date) => (
  new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
);

export const capitalize = (word) => (
  word && word[0].toUpperCase() + word.slice(1)
);

export const calculateRatingPercent = (rating) => (
  `${(rating * 20)}%`
);

export const getOffersByCity = (city, offers) => (
  offers.filter((offer) => offer.city.name === city.name)
);

export const selectPluralFormForNoun = (value, singleForm, pluralForm) => (
  value === 1 ? singleForm : pluralForm
);
