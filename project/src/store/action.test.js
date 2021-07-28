import {
  changeCity,
  sortOffers,
  loadOffers,
  loadOffersNearby,
  loadComments,
  loadRoom,
  loadFavorites,
  updateOffer,
  requireAuthorization,
  login,
  logout,
  setError,
  resetError,
  resetOffers,
  setCommentError,
  resetCommentError,
  ActionType
} from './action';

describe('Actions', () => {
  it('action creator for changing city returns correct action', () => {
    const expectedAction = {
      type: ActionType.CHANGE_CITY,
      payload: 'New City',
    };

    const city = 'New City';

    expect(changeCity(city)).toEqual(expectedAction);
  });

  it('action creator for changing sorting options returns correct action', () => {
    const expectedAction = {
      type: ActionType.SORT_OFFERS,
      payload: 'popular',
    };

    const sortBy = 'popular';

    expect(sortOffers(sortBy)).toEqual(expectedAction);
  });

  it('action creator for loading offers returns correct action', () => {
    const expectedAction = {
      type: ActionType.LOAD_OFFERS,
      payload: [],
    };

    const offers = [];

    expect(loadOffers(offers)).toEqual(expectedAction);
  });

  it('action creator for loading offers nearby returns correct action', () => {
    const expectedAction = {
      type: ActionType.LOAD_OFFERS_NEARBY,
      payload: [],
    };

    const offers = [];

    expect(loadOffersNearby(offers)).toEqual(expectedAction);
  });

  it('action creator for loading comments returns correct action', () => {
    const expectedAction = {
      type: ActionType.LOAD_COMMENTS,
      payload: [],
    };

    const comments = [];

    expect(loadComments(comments)).toEqual(expectedAction);
  });

  it('action creator for loading room data returns correct action', () => {
    const expectedAction = {
      type: ActionType.LOAD_ROOM,
      payload: {},
    };

    const room = {};

    expect(loadRoom(room)).toEqual(expectedAction);
  });

  it('action creator for loading favorites offers returns correct action', () => {
    const expectedAction = {
      type: ActionType.LOAD_FAVORITES,
      payload: [],
    };

    const favorites = [];

    expect(loadFavorites(favorites)).toEqual(expectedAction);
  });

  it('action creator for offer returns correct action', () => {
    const expectedAction = {
      type: ActionType.UPDATE_OFFER,
      payload: {},
    };

    const offer = {};

    expect(updateOffer(offer)).toEqual(expectedAction);
  });

  it('action creator for checking need for authorization returns correct action', () => {
    const expectedAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: 'AUTH',
    };

    const status = 'AUTH';

    expect(requireAuthorization(status)).toEqual(expectedAction);
  });

  it('action creator for loging IN returns correct action', () => {
    const expectedAction = {
      type: ActionType.LOGIN,
      payload: {
        email: '',
        id: null,
        name: '',
        avatarUrl: '',
        isPro: false,
        loginError: '',
        commentError: '',
      },
    };

    const user = {
      email: '',
      id: null,
      name: '',
      avatarUrl: '',
      isPro: false,
      loginError: '',
      commentError: '',
    };

    expect(login(user)).toEqual(expectedAction);
  });

  it('action creator for loging OUT returns correct action', () => {
    const expectedAction = {
      type: ActionType.LOGOUT,
    };

    expect(logout()).toEqual(expectedAction);
  });

  it('action creator for setting login error returns correct action', () => {
    const expectedAction = {
      type: ActionType.SET_ERROR,
      payload: '401',
    };

    const error = '401';

    expect(setError(error)).toEqual(expectedAction);
  });

  it('action creator for reseting login error returns correct action', () => {
    const expectedAction = {
      type: ActionType.RESET_ERROR,
    };

    expect(resetError()).toEqual(expectedAction);
  });

  it('action creator for reseting offers returns correct action', () => {
    const expectedAction = {
      type: ActionType.RESET_OFFERS,
    };

    expect(resetOffers()).toEqual(expectedAction);
  });

  it('action creator for setting comment error returns correct action', () => {
    const expectedAction = {
      type: ActionType.SET_COMMENT_ERROR,
      payload: '401',
    };

    const error = '401';

    expect(setCommentError(error)).toEqual(expectedAction);
  });

  it('action creator for reseting comment error returns correct action', () => {
    const expectedAction = {
      type: ActionType.RESET_COMMENT_ERROR,
    };

    expect(resetCommentError()).toEqual(expectedAction);
  });
});
