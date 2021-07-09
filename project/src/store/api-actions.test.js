import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../services/api';
import { ActionType } from './action';
import {
  checkAuth,
  login,
  fetchOffersList,
  fetchRoom,
  fetchComments,
  fetchOffersNearby,
  fetchFavorites,
  postComment,
  postFavorite,
  logout
} from './api-actions';
import { APIRoute, AuthorizationStatus } from '../const';

let api = null;

describe('Async operations', () => {
  beforeAll(() => {
    api = createAPI(() => {});
  });

  it('should make a correct API call to GET /login', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuthLoader = checkAuth();

    apiMock
      .onGet(APIRoute.LOGIN)
      .reply(200, [{fake: true}]);

    return checkAuthLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });
      });
  });

  it('should make a correct API call to POST /login', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    const fakeUser = {
      email: 'test@test.ru',
      password: '123456',
    };

    const fakeUserAfterReply = {
      email: 'test@test.ru',
      avatarUrl: 'img/img.img',
      id: 1,
      isPro: false,
      name: 'test',
    };

    const fakeReply = '{"id":1,"email":"test@test.ru","name":"test","avatar_url":"img/img.img","is_pro":false,"token":"eW91LmFyZS5lbXB0eUBnbWFpbC5jb20="}';

    const loginLoader = login(fakeUser, () => {});

    apiMock
      .onPost(APIRoute.LOGIN)
      .reply(200, fakeReply);

    return loginLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOGIN,
          payload: fakeUserAfterReply,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH,
        });
      });
  });

  it('should make a correct API call to GET /hotels', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeReply = '[{"city":{"name":"Cologne","location":{"latitude":50.938361,"longitude":6.959974,"zoom":13}},"preview_image":"https://7.react.pages.academy/static/hotel/2.jpg","images":["https://7.react.pages.academy/static/hotel/11.jpg"],"title":"Perfectly located Castro","is_favorite":false,"is_premium":true,"rating":3.4,"type":"apartment","bedrooms":3,"max_adults":6,"price":301,"goods":["Air conditioning","Washer","Laptop friendly workspace","Breakfast"],"host":{"id":25,"name":"Angelina","is_pro":true,"avatar_url":"img/avatar-angelina.jpg"},"description":"A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families or friends.","location":{"latitude":50.917361,"longitude":6.977974,"zoom":16},"id":1}]';
    const offersLoader = fetchOffersList();

    const expectedFakeOffers = [{
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
      goods:[
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

    apiMock
      .onGet(APIRoute.OFFERS)
      .reply(200, fakeReply);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS,
          payload: expectedFakeOffers,
        });
      });
  });

  it('should make a correct API call to GET /hotels/:id/nearby', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeReply = '[{"city":{"name":"Cologne","location":{"latitude":50.938361,"longitude":6.959974,"zoom":13}},"preview_image":"https://7.react.pages.academy/static/hotel/2.jpg","images":["https://7.react.pages.academy/static/hotel/11.jpg"],"title":"Perfectly located Castro","is_favorite":false,"is_premium":true,"rating":3.4,"type":"apartment","bedrooms":3,"max_adults":6,"price":301,"goods":["Air conditioning","Washer","Laptop friendly workspace","Breakfast"],"host":{"id":25,"name":"Angelina","is_pro":true,"avatar_url":"img/avatar-angelina.jpg"},"description":"A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families or friends.","location":{"latitude":50.917361,"longitude":6.977974,"zoom":16},"id":1}]';
    const fakeRoomId = 1;
    const expectedFakeOffersNearBy = [{
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
      goods:[
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

    const offersNearbyLoader = fetchOffersNearby(fakeRoomId);

    apiMock
      .onGet(APIRoute.ROOM + fakeRoomId.toString() + APIRoute.NEARBY)
      .reply(200, fakeReply);

    return offersNearbyLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_OFFERS_NEARBY,
          payload: expectedFakeOffersNearBy,
        });
      });
  });

  it('should make a correct API call to GET /favorite', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeReply = '[{"city":{"name":"Cologne","location":{"latitude":50.938361,"longitude":6.959974,"zoom":13}},"preview_image":"https://7.react.pages.academy/static/hotel/2.jpg","images":["https://7.react.pages.academy/static/hotel/11.jpg"],"title":"Perfectly located Castro","is_favorite":false,"is_premium":true,"rating":3.4,"type":"apartment","bedrooms":3,"max_adults":6,"price":301,"goods":["Air conditioning","Washer","Laptop friendly workspace","Breakfast"],"host":{"id":25,"name":"Angelina","is_pro":true,"avatar_url":"img/avatar-angelina.jpg"},"description":"A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families or friends.","location":{"latitude":50.917361,"longitude":6.977974,"zoom":16},"id":1}]';

    const expectedFakeFavorites = [{
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
      goods:[
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

    const favoritesLoader = fetchFavorites();

    apiMock
      .onGet(APIRoute.FAVORITE)
      .reply(200, fakeReply);

    return favoritesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FAVORITES,
          payload: expectedFakeFavorites,
        });
      });
  });

  it('should make a correct API call to GET /hotels/:id', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeReply = '{"city":{"name":"Cologne","location":{"latitude":50.938361,"longitude":6.959974,"zoom":13}},"preview_image":"https://7.react.pages.academy/static/hotel/2.jpg","images":["https://7.react.pages.academy/static/hotel/11.jpg"],"title":"Perfectly located Castro","is_favorite":false,"is_premium":true,"rating":3.4,"type":"apartment","bedrooms":3,"max_adults":6,"price":301,"goods":["Air conditioning","Washer","Laptop friendly workspace","Breakfast"],"host":{"id":25,"name":"Angelina","is_pro":true,"avatar_url":"img/avatar-angelina.jpg"},"description":"A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families or friends.","location":{"latitude":50.917361,"longitude":6.977974,"zoom":16},"id":1}';

    const expectedFakeRoom = {
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
      goods:[
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
    };

    const roomLoader = fetchRoom(expectedFakeRoom.id, () =>{});

    apiMock
      .onGet(APIRoute.ROOM + expectedFakeRoom.id.toString())
      .reply(200, fakeReply);

    return roomLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_ROOM,
          payload: expectedFakeRoom,
        });
      });
  });

  it('should make a correct API call to GET /comments/:id', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeReply = '[{"id":1,"user":{"id":14,"is_pro":true,"name":"Corey","avatar_url":"https://7.react.pages.academy/static/avatar/5.jpg"},"rating":5,"comment":"I stayed here for one night and it was an unpleasant experience.","date":"2021-07-03T13:27:50.244Z"}]';
    const fakeRoomId = 1;
    const expectedFakeCooments = [{
      id: 1,
      user:{
        id: 14,
        isPro: true,
        name: 'Corey',
        avatarUrl: 'https://7.react.pages.academy/static/avatar/5.jpg',
      },
      rating: 5,
      comment: 'I stayed here for one night and it was an unpleasant experience.',
      date: '2021-07-03T13:27:50.244Z',
    }];

    const commentsLoader = fetchComments(fakeRoomId);

    apiMock
      .onGet(APIRoute.COMMENTS + fakeRoomId.toString())
      .reply(200, fakeReply);

    return commentsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_COMMENTS,
          payload: expectedFakeCooments,
        });
      });
  });

  it('should make a correct API call to POST /comments/:id', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    const fakeComment = {
      comment: 'I stayed here for one night and it was an unpleasant experience.',
      rating: '5',
    };

    const fakeReply = '[{"id":1,"user":{"id":14,"is_pro":true,"name":"Corey","avatar_url":"https://7.react.pages.academy/static/avatar/5.jpg"},"rating":5,"comment":"I stayed here for one night and it was an unpleasant experience.","date":"2021-07-03T13:27:50.244Z"}]';
    const fakeRoomId = 1;
    const expectedFakeComments = [{
      id: 1,
      user:{
        id: 14,
        isPro: true,
        name: 'Corey',
        avatarUrl: 'https://7.react.pages.academy/static/avatar/5.jpg',
      },
      rating: 5,
      comment: 'I stayed here for one night and it was an unpleasant experience.',
      date: '2021-07-03T13:27:50.244Z',
    }];

    const commentsLoader = postComment(fakeComment, fakeRoomId);

    apiMock
      .onPost(APIRoute.COMMENTS + fakeRoomId.toString(), fakeComment)
      .reply(200, fakeReply);

    return commentsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_COMMENTS,
          payload: expectedFakeComments,
        });
      });
  });

  it('should make a correct API call to POST favorite /favorite/:id/:status', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeReplyFavFalse = '{"is_favorite":false,"id":1}';

    const fakeRoomFavTrue = {
      isFavorite: true,
      id: 1,
    };

    const favoriteLoader = postFavorite(fakeRoomFavTrue.id, fakeRoomFavTrue.isFavorite, () =>{});

    apiMock
      .onPost(`${APIRoute.FAVORITE}/${fakeRoomFavTrue.id}/${fakeRoomFavTrue.isFavorite ? 1 : 0}`)
      .reply(200, fakeReplyFavFalse);

    return favoriteLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.UPDATE_OFFER,
          payload: fakeRoomFavTrue.id,
        });
      });
  });

  it('should make a correct API call to POST unfavorite /favorite/:id/:status', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeReplyFavTrue = '{"is_favorite":true,"id":1}';

    const fakeRoomFavFalse = {
      isFavorite: false,
      id: 1,
    };

    const favoriteLoader = postFavorite(fakeRoomFavFalse.id, fakeRoomFavFalse.isFavorite, () =>{});

    apiMock
      .onPost(`${APIRoute.FAVORITE}/${fakeRoomFavFalse.id}/${fakeRoomFavFalse.isFavorite ? 1 : 0}`)
      .reply(200, fakeReplyFavTrue);

    return favoriteLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.UPDATE_OFFER,
          payload: fakeRoomFavFalse.id,
        });
      });
  });

  it('should make a correct API call to DELETE /logout', () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const logoutLoader = logout();

    apiMock
      .onDelete(APIRoute.LOGOUT)
      .reply(204);

    return logoutLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOGOUT,
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.RESET_OFFERS,
        });
      });
  });
});
