export const convertDateToMonthAndDate = (date) => (
  new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
);

export const capitalize = (word) => (
  word && word[0].toUpperCase() + word.slice(1)
);

export const calculateRatingPercent = (rating) => (
  `${(rating * 20)}%`
);
