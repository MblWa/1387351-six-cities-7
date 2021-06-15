export const AppRoute = {
  LOGIN: '/login',
  FAVORITES: '/favorites',
  ROOM: '/offer/:id',
  ROOT: '/',
};

export const OFFER_PATH = '/offer/';

export const Rating = {
  MAXIMUM_RATING: 5,
  5: 'perfect',
  4: 'good',
  3: 'not bad',
  2: 'badly',
  1: 'terribly',
};

export const CITY_AMSTERDAM = {
  location: {
    latitude: 52.370216,
    longitude: 4.895168,
    zoom: 10,
  },
  name: 'Amsterdam',
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
