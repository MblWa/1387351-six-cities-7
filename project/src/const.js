export const AppRoute = {
  LOGIN: '/login',
  FAVORITES: '/favorites',
  ROOM: '/offer/:id',
  ROOT: '/',
};

export const OFFER_PATH = '/offer/';

export const SortByOptions = {
  POPULAR: 'Popular',
  PRICE_LOW: 'Price: low to high',
  PRICE_HIGH: 'Price: high to low',
  TOP_RATED: 'Top rated first',
};

export const Rating = {
  MAXIMUM_RATING: 5,
  5: 'perfect',
  4: 'good',
  3: 'not bad',
  2: 'badly',
  1: 'terribly',
};

export const DEFAULT_CUSTOM_ICON = {
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
};

export const ACTIVE_CUSTOM_ICON = {
  iconUrl: './img/pin-active.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
};

export const MAXIMUM_NEARBY_OFFERS_COUNT = 3;

export const CITIES_LIST = {
  PARIS: {
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 10,
    },
    name: 'Paris',
  },
  COLOGNE: {
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 10,
    },
    name: 'Cologne',
  },
  BRUSSELS: {
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 10,
    },
    name: 'Brussels',
  },
  AMSTERDAM: {
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 10,
    },
    name: 'Amsterdam',
  },
  HAMBURG: {
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 10,
    },
    name: 'Hamburg',
  },
  DUSSELDORF: {
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 10,
    },
    name: 'Dusseldorf',
  },
};

export const AuthorizationStatus = {
  AUTH: 'AUTH',
  NO_AUTH: 'NO_AUTH',
  UNKNOWN: 'UNKNOWN',
};

export const APIRoute = {
  OFFERS: '/hotels',
  ROOM: '/hotels/:id',
  NERABY: '/hotels/:hotel_id/nearby',
  FAVORITE: '/favorite',
  UPDATE_FAVORITE: '/favorite/:hotel_id/:status',
  COMMENTS: '/comments/:hotel_id',
  POST_COMMENT: '/comments/:hotel_id',
  LOGIN: '/login',
  LOGOUT: '/logout',
};

export const AdapterKeys = {
  'is_favorite': 'isFavorite',
  'is_premium': 'isPremium',
  'max_adults': 'maxAdults',
  'preview_image': 'previewImage',
  'avatar_url': 'avatarUrl',
  'is_pro': 'isPro',
};
