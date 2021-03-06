import {
  CITIES_LIST,
  AuthorizationStatus,
  MINIMUM_REVIEW_CHAR_COUNT,
  MAXIMUM_REVIEW_CHAR_COUNT,
  Rating
} from './const';

export const arrangeOffersByCity = (offers, ...updateParams) => {
  const { cityName, id } = updateParams;
  const offersByCity = {};

  offers.forEach((offer) => {
    if (!offersByCity[offer.city.name]) {
      offersByCity[offer.city.name] = [offer];
    } else {
      offersByCity[offer.city.name].push(offer);
    }
  });

  if (updateParams.length !== 0 ) {
    offersByCity[cityName].map((offer) => offer.isFavorite = offer.id === id ? !offer.isFavorite : offer.isFavorite);
  }

  Object.values(CITIES_LIST).forEach(({ name }) => {
    if (!offersByCity[name]) {
      offersByCity[name] = [];
    }
  });

  return offersByCity;
};

export const updateOfferFavoriteStatus = (values, id) => {
  if (values.length === 0 || !values[0].id) {
    return values;
  }

  return values.map((value) => ({
    ...value,
    isFavorite: value.id === id ? !value.isFavorite : value.isFavorite,
  }));
};


export const convertDateToMonthAndDate = (date) => {
  const convertedDate = new Date(date);
  if (convertedDate instanceof Date && !isNaN(convertedDate)) {
    return convertedDate.toLocaleDateString('en-US',
      {
        month: 'long',
        day: 'numeric',
      });
  }
  return date;
};

export const capitalize = (word) => (
  word && word[0].toUpperCase() + word.slice(1).toLowerCase()
);

export const calculateRatingPercent = (rating) => (
  `${(Math.round(rating) * 20)}%`
);

export const selectPluralFormForNoun = (value, singleForm, pluralForm) => (
  value === 1 ? singleForm : pluralForm
);

export const isNestedArraysEmpty = (object) => Object.values(object).reduce((accum, value) => accum += value.length, 0) === 0;

export const isCheckedAuth = (authorizationStatus) => (
  authorizationStatus === AuthorizationStatus.UNKNOWN
);

export const adaptOffersKeys = (array) => (
  array.map((obj) => (
    {
      bedrooms: obj.bedrooms ?? null,
      city: obj.city ?? {},
      description: obj.description ?? '',
      goods: obj.goods ?? [],
      isFavorite: obj.is_favorite ?? false,
      isPremium: obj.is_premium  ?? false,
      maxAdults: obj.max_adults ?? null,
      previewImage: obj.preview_image ?? '',
      host: {
        id: obj.host.id ?? null,
        name: obj.host.name ?? '',
        avatarUrl: obj.host.avatar_url ?? '',
        isPro: obj.host.is_pro ?? false,
      },
      id: obj.id ?? null,
      images: obj.images ?? [],
      location: obj.location ?? {},
      price: obj.price ?? null,
      rating: obj.rating ?? null,
      title: obj.title ?? '',
      type: obj.type ?? '',
    }
  ))
);

export const adaptCommentsKeys = (array) => (
  array.map((obj) => (
    {
      comment: obj.comment ?? '',
      date: obj.date ?? '',
      id: obj.id ?? null,
      rating: obj.rating ?? null,
      user: {
        id: obj.user.id ?? null,
        name: obj.user.name ?? '',
        avatarUrl: obj.user.avatar_url ?? '',
        isPro: obj.user.is_pro ?? false,
      } ?? {
        id: null,
        name: '',
        avatarUrl: '',
        isPro: false,
      },
    }
  ))
);

export const adaptUserKeys = (data) => (
  {
    email: data.email ?? '',
    id: data.id ?? null,
    name: data.name ?? '',
    avatarUrl: data.avatar_url ?? '',
    isPro: data.is_pro ?? false,
  }
);

export const setApiHeadersWithToken = (api) => (
  api.defaults.headers['x-token'] = localStorage.getItem('token') ?? ''
);

export const isValidEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const isValidPassword = (password) => {
  const passwordLength = password.length;

  if (passwordLength === 0) {
    return false;
  }

  const spaceCount = (password.match(/ /g) || []).length;
  return !(spaceCount === passwordLength);
};

export const isValidPost = (rating, comment) => {
  const commentLength = comment.length;
  return (
    commentLength >= MINIMUM_REVIEW_CHAR_COUNT
    && commentLength <= MAXIMUM_REVIEW_CHAR_COUNT
    && rating > 0
    && rating <= Rating.MAXIMUM_RATING
  );
};
