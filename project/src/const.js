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
      latitude: 48.858950,
      longitude: 2.277020,
      zoom: 10,
    },
    name: 'Paris',
  },
  COLOGNE: {
    location: {
      latitude: 50.957835,
      longitude: 6.827240,
      zoom: 10,
    },
    name: 'Cologne',
  },
  BRUSSELS: {
    location: {
      latitude: 50.855062,
      longitude: 4.305350,
      zoom: 10,
    },
    name: 'Brussels',
  },
  AMSTERDAM: {
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10,
    },
    name: 'Amsterdam',
  },
  HAMBURG: {
    location: {
      latitude: 53.558694,
      longitude: 9.78774,
      zoom: 10,
    },
    name: 'Hamburg',
  },
  DUSSELDORF: {
    location: {
      latitude: 51.238586,
      longitude: 6.674268,
      zoom: 10,
    },
    name: 'Dusseldorf',
  },
};
