import {AuthorizationStatus} from './const';

export const arrangeOffersByCity = (offers) => {
  const offersByCity = {};

  offers.forEach((offer) => {
    if (!offersByCity[offer.city.name]) {
      offersByCity[offer.city.name] = [offer];
    } else {
      offersByCity[offer.city.name].push(offer);
    }
  });

  return offersByCity;
};

export const convertDateToMonthAndDate = (date) => (
  new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
);

export const capitalize = (word) => (
  word && word[0].toUpperCase() + word.slice(1)
);

export const calculateRatingPercent = (rating) => (
  `${(Math.round(rating) * 20)}%`
);

export const selectPluralFormForNoun = (value, singleForm, pluralForm) => (
  value === 1 ? singleForm : pluralForm
);

export const isCheckedAuth = (authorizationStatus) => (
  authorizationStatus === AuthorizationStatus.UNKNOWN
);

export const adaptOffersKeys = (array) => (
  array.map((obj) => (
    {
      bedrooms: obj.bedrooms,
      city: obj.city,
      description: obj.description,
      goods: obj.goods,
      isFavorite: obj.is_favorite,
      isPremium: obj.is_premium,
      maxAdults: obj.max_adults,
      previewImage: obj.preview_image,
      host: {
        id: obj.host.id,
        name: obj.host.name,
        avatarUrl: obj.host.avatar_url,
        isPro: obj.host.is_pro,
      },
      id: obj.id,
      images: obj.images,
      location: obj.location,
      price: obj.price,
      rating: obj.rating,
      title: obj.title,
      type: obj.type,
    }
  ))
);

export const adaptCommentsKeys = (array) => (
  array.map((obj) => (
    {
      comment: obj.comment,
      date: obj.date,
      id: obj.id,
      rating: obj.rating,
      user: {
        id: obj.user.id,
        name: obj.user.name,
        avatarUrl: obj.user.avatar_url,
        isPro: obj.user.is_pro,
      },
    }
  ))
);

export const adaptUserKeys = (data) => (
  {
    email: data.email,
    id: data.id,
    name: data.name,
    avatarUrl: data.avatar_url,
    isPro: data.is_pro,
  }
);
