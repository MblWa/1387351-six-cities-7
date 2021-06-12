const AVATAR_URL = 'https://i.pravatar.cc/128';

const reviews = [
  {
    'comment': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'date': '2019-05-08T14:13:56.569Z',
    'id': 1,
    'rating': 1,
    'user': {
      'avatarUrl': `${AVATAR_URL}?rnd=${Math.random()}`,
      'id': 4,
      'isPro': false,
      'name': 'Iren',
    },
  },
  {
    'comment': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'date': '2019-02-15T14:13:56.569Z',
    'id': 2,
    'rating': 2,
    'user': {
      'avatarUrl': `${AVATAR_URL}?rnd=${Math.random()}`,
      'id': 2,
      'isPro': false,
      'name': 'Max',
    },
  },
];

export default reviews;
