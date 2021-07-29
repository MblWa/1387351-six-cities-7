import {
  arrangeOffersByCity,
  updateOfferFavoriteStatus,
  convertDateToMonthAndDate,
  capitalize,
  calculateRatingPercent,
  selectPluralFormForNoun,
  isNestedArraysEmpty,
  isCheckedAuth,
  adaptOffersKeys,
  adaptCommentsKeys,
  adaptUserKeys,
  setApiHeadersWithToken,
  isValidEmail,
  isValidPassword,
  isValidPost
} from './util';
import {
  CITIES_LIST,
  AuthorizationStatus,
  MINIMUM_REVIEW_CHAR_COUNT,
  MAXIMUM_REVIEW_CHAR_COUNT,
  Rating
} from './const';
import { testOffers } from './test-mocks/test-mocks';

describe('Test suit for util-functions', () => {
  it('should check if vaild post formed', () => {
    const Comments = {
      BAD_COMMENTS: [
        '',
        'a',
        'a'.repeat(MINIMUM_REVIEW_CHAR_COUNT - 1),
        'a'.repeat(MAXIMUM_REVIEW_CHAR_COUNT + 1),
      ],
      GOOD_COMMENTS: [
        'a'.repeat(MINIMUM_REVIEW_CHAR_COUNT),
        'a'.repeat(MAXIMUM_REVIEW_CHAR_COUNT - 1),
        'a'.repeat(MAXIMUM_REVIEW_CHAR_COUNT),
      ],
    };
    const Ratings = {
      BAD_RATINGS: [
        0,
        1 + Rating.MAXIMUM_RATING,
        -1,
        100 * Rating.MAXIMUM_RATING,
        -100 * Rating.MAXIMUM_RATING,
      ],
      GOOD_RATINGS: [1, Rating.MAXIMUM_RATING],
    };

    Comments.BAD_COMMENTS.forEach((badComment) => {
      Ratings.BAD_RATINGS.forEach((badRating) => {
        expect(isValidPost(badRating, badComment)).toEqual(false);
      });
      Ratings.GOOD_RATINGS.forEach((goodRating) => {
        expect(isValidPost(goodRating, badComment)).toEqual(false);
      });
    });

    Comments.GOOD_COMMENTS.forEach((goodComment) => {
      Ratings.BAD_RATINGS.forEach((badRating) => {
        expect(isValidPost(badRating, goodComment)).toEqual(false);
      });
      Ratings.GOOD_RATINGS.forEach((goodRating) => {
        expect(isValidPost(goodRating, goodComment)).toEqual(true);
      });
    });
  });

  it('should check if vaild password confirmed', () => {
    const Passwords = {
      BAD_PASSWORDS: [
        ' ',
        '',
        ' '.repeat(10),
      ],
      GOOD_PASSWORDS: [
        'a',
        '1 1',
        '        1',
        'test string',
      ],
    };

    Passwords.BAD_PASSWORDS.forEach((badPassword) => {
      expect(isValidPassword(badPassword)).toEqual(false);
    });

    Passwords.GOOD_PASSWORDS.forEach((goodPassword) => {
      expect(isValidPassword(goodPassword)).toEqual(true);
    });
  });

  it('should check if vaild email confirmed', () => {
    const Emails = {
      BAD_EMAILS: [
        '',
        ' ',
        'someone@127.0.0.1',
        'a@b.b',
        '.wooly@example.com',
        'wo..oly@example.com',
        'somebody@example',
        'invalid:email@example.com',
        '@somewhere.com',
        'example.com',
        '@@example.com',
        'a space@example.com',
        'something@ex..ample.com',
        'a\b@c',
        'someone@somewhere.com.',
        'someone@somewhere.com@',
        'someone@somewhere_com',
        'someone@some:where.com',
        '.',
        'F/s/f/a@feo+re.com',
        'some+long+email+address@some+host-weird-/looking.com',
        'a @p.com',
        'a\u0020@p.com',
        ' a@p.com',
      ],
      GOOD_EMAILS: [
        'something@something.com',
        'someone@localhost.localdomain',
        'a/b@domain.com',
        '{}@domain.com',
        'm*\'!%@something.sa',
        'tu!!7n7.ad##0!!!@company.ca',
        '%@com.com',
        '!#$%&\'*+/=?^_`{|}~.-@com.com',
        'someone@do-ma-in.com',
      ],
    };

    Emails.BAD_EMAILS.forEach((badEmail) => {
      expect(isValidEmail(badEmail)).toEqual(false);
    });

    Emails.GOOD_EMAILS.forEach((goodEmail) => {
      expect(isValidEmail(goodEmail)).toEqual(true);
    });
  });

  it('should set API Header x-token with empty string', () => {
    Storage.prototype.getItem = jest.fn();
    const api = {
      defaults: {
        headers: {},
      },
    };

    setApiHeadersWithToken(api);
    expect(Storage.prototype.getItem).toBeCalledTimes(1);
    expect(Storage.prototype.getItem).nthCalledWith(1, 'token');
    expect(api.defaults.headers['x-token']).toEqual('');
  });

  it('should set API Header x-token with token provided', () => {
    const SECRET_TOKEN = 'secret-token';
    Storage.prototype.getItem = jest.fn(() => SECRET_TOKEN);

    const api = {
      defaults: {
        headers: {},
      },
    };

    setApiHeadersWithToken(api);
    expect(api.defaults.headers['x-token']).toEqual(SECRET_TOKEN);
  });

  it('should adapt keys in User Object', () => {
    const rawData = {
      email: 'email',
      'avatar_url': 'avatar_url',
      'is_pro': 'is_pro',
    };
    const parsedData = {
      email: 'email',
      id: null,
      name: '',
      avatarUrl: 'avatar_url',
      isPro: 'is_pro',
    };

    expect(adaptUserKeys(rawData)).toEqual(parsedData);
  });

  it('should adapt keys in Comments Object', () => {
    const rawData = [{
      comment: 'comment',
      date: 'date',
      id: 1,
      user: {
        'avatar_url': 'avatar_url',
        'is_pro': true,
      },
    }];
    const parsedData = [{
      comment: 'comment',
      date: 'date',
      id: 1,
      rating: null,
      user: {
        id: null,
        name: '',
        avatarUrl: 'avatar_url',
        isPro: true,
      },
    }];

    expect(adaptCommentsKeys(rawData)).toEqual(parsedData);
    expect(adaptCommentsKeys([])).toEqual([]);
  });

  it('should adapt keys in Offers Object', () => {
    const rawData = [{
      bedrooms: 5,
      city: 'Paris',
      description: 'description',
      goods: 'goods',
      'is_favorite': true,
      'is_premium': false,
      'max_adults': 1,
      'preview_image': 'image',
      host: {
        'avatar_url': 'avatar_url',
        'is_pro': true,
      },
      id: 1,
      images: 'images',
      location: 'location',
      price: 100,
      rating: 1,
      title: 'title',
      type: 'type',
    }];
    const parsedData = [{
      bedrooms: 5,
      city: 'Paris',
      description: 'description',
      goods: 'goods',
      isFavorite: true,
      isPremium: false,
      maxAdults: 1,
      previewImage: 'image',
      host: {
        id: null,
        name: '',
        avatarUrl: 'avatar_url',
        isPro: true,
      },
      id: 1,
      images: 'images',
      location: 'location',
      price: 100,
      rating: 1,
      title: 'title',
      type: 'type',
    }];

    expect(adaptOffersKeys(rawData)).toEqual(parsedData);
    expect(adaptOffersKeys([])).toEqual([]);
  });

  it('should check if AUTH is UNKNOWN', () => {
    expect(isCheckedAuth(AuthorizationStatus.AUTH)).toEqual(false);
    expect(isCheckedAuth(AuthorizationStatus.NO_AUTH)).toEqual(false);
    expect(isCheckedAuth(AuthorizationStatus.UNKNOWN)).toEqual(true);
  });

  it('should check if nested Array is empty', () => {
    expect(isNestedArraysEmpty({})).toEqual(true);
    expect(isNestedArraysEmpty({key: []})).toEqual(true);
    expect(isNestedArraysEmpty({key: ['no!']})).toEqual(false);
    expect(isNestedArraysEmpty({key: ['no!'], key2: ['no!x2']})).toEqual(false);
  });

  it('should select correct plural form', () => {
    expect(selectPluralFormForNoun(1, 'single', 'plural')).toEqual('single');
    expect(selectPluralFormForNoun(10, 'single', 'plural')).toEqual('plural');
  });

  it('should calculate correct rating in percents', () => {
    expect(calculateRatingPercent(1)).toEqual('20%');
    expect(calculateRatingPercent(5)).toEqual('100%');
    expect(calculateRatingPercent(1.01)).toEqual('20%');
    expect(calculateRatingPercent(1.49)).toEqual('20%');
    expect(calculateRatingPercent(1.5)).toEqual('40%');
    expect(calculateRatingPercent(1.51)).toEqual('40%');
    expect(calculateRatingPercent(1.99)).toEqual('40%');
  });

  it('should capitalize the word if any provided', () => {
    expect(capitalize('word')).toEqual('Word');
    expect(capitalize('WORD')).toEqual('Word');
    expect(capitalize('Test String')).toEqual('Test string');
    expect(capitalize(' test String')).toEqual(' test string');
    expect(capitalize('1st String')).toEqual('1st string');
    expect(capitalize('wORD')).toEqual('Word');
    expect(capitalize('')).toEqual('');
    expect(capitalize(' ')).toEqual(' ');
  });

  it('should convert date to userfriendly month & date format', () => {
    expect(convertDateToMonthAndDate('2021-07-16T08:50:43.820Z')).toEqual('July 16');
    expect(convertDateToMonthAndDate('2021-06-16T08:50:43.820Z')).toEqual('June 16');
    expect(convertDateToMonthAndDate('')).toEqual('');
    expect(convertDateToMonthAndDate(' ')).toEqual(' ');
    expect(convertDateToMonthAndDate('2021')).toEqual('January 1');
  });

  it('should update favorites status of the offer', () => {
    const [ offerUnFav ] = testOffers;
    const { id } = offerUnFav;
    const offerFav = {...offerUnFav};
    offerFav.isFavorite = true;
    expect(updateOfferFavoriteStatus([{}])).toEqual([{}]);
    expect(updateOfferFavoriteStatus([offerUnFav], id)).toEqual([offerFav]);
    expect(updateOfferFavoriteStatus([offerFav], id)).toEqual([offerUnFav]);
    expect(updateOfferFavoriteStatus([offerUnFav], id + 1)).toEqual([offerUnFav]);
  });

  it('should rearrange offers by city', () => {
    const initialObjectByCity = {};
    Object.values(CITIES_LIST).forEach(({ name }) => {
      if (!initialObjectByCity[name]) {
        initialObjectByCity[name] = [];
      }
    });
    const populatedObjectByCity = {...initialObjectByCity};
    populatedObjectByCity[testOffers[0].city.name] = testOffers;
    expect(arrangeOffersByCity([])).toEqual(initialObjectByCity);
    expect(arrangeOffersByCity(testOffers)).toEqual(populatedObjectByCity);
  });
});
