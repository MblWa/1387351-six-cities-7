import { AuthorizationStatus } from '../const';

export const testOffers = [{
  city: {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13,
    },
  },
  previewImage: 'https://7.react.pages.academy/static/hotel/2.jpg',
  images: [
    'https://7.react.pages.academy/static/hotel/11.jpg',
  ],
  title: 'Perfectly located Castro',
  isFavorite: false,
  isPremium: true,
  rating: 3.4,
  type: 'apartment',
  bedrooms: 3,
  maxAdults: 6,
  price: 301,
  goods: [
    'Air conditioning',
    'Washer',
    'Laptop friendly workspace',
    'Breakfast',
  ],
  host: {
    id:25,
    name: 'Angelina',
    isPro: true,
    avatarUrl: 'img/avatar-angelina.jpg',
  },
  description: 'A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families or friends.',
  location: {
    latitude: 50.917361,
    longitude: 6.977974,
    zoom: 16,
  },
  id: 1,
}];

export const testCity = {
  name: 'Cologne',
  location: {
    latitude: 50.938361,
    longitude: 6.959974,
    zoom: 13,
  },
};

export const testNotAuthUser = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  user: {
    email: '',
    id: null,
    name: '',
    isPro: false,
    avatarUrl: '',
    loginError: '',
    commentError: '',
  },
};

export const testAuthUser = {
  authorizationStatus: AuthorizationStatus.AUTH,
  user: {
    email: 'test@test.ru',
    id: 1,
    name: 'test',
    isPro: false,
    avatarUrl: 'img/img.img',
    loginError: '',
    commentError: '',
  },
};

export const testReviews = [
  {
    comment: 'Bathed in the nature. Completely unplugged. Unforgettable.',
    date: '2021-07-03T13:27:50.244Z',
    id: 1,
    rating: 3,
    user: {
      id: 19,
      name: 'Christina',
      avatarUrl: 'https://7.react.pages.academy/static/avatar/10.jpg',
      isPro: false,
    },
  },
  {
    comment: 'Bathed in the nature. Completely unplugged. Unforgettable.',
    date: '2021-07-03T13:27:50.244Z',
    id: 2,
    rating: 3,
    user: {
      id: 19,
      name: 'Christina',
      avatarUrl: 'https://7.react.pages.academy/static/avatar/10.jpg',
      isPro: false,
    },
  },
];
