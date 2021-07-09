import { AuthorizationStatus } from '../../const';
import { ActionType } from '../action';
import { user } from './user';

describe('Reducer: user', () => {
  it('without additional parameters should return initial state', () => {
    expect(user(undefined, {}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.UNKNOWN,
        user: {
          email: '',
          id: null,
          name: '',
          avatarUrl: '',
          isPro: false,
          loginError: '',
        }});
  });

  it('should set authorization status', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.UNKNOWN,
    };

    const setRequireAuthorization = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    };

    expect(user(state, setRequireAuthorization))
      .toEqual({authorizationStatus: AuthorizationStatus.AUTH});
  });

  it('should update user state after successful login', () => {
    const state = {
      user: {
        email: '',
        id: null,
        name: '',
        avatarUrl: '',
        isPro: false,
        loginError: '',
      }};

    const setLoginAction = {
      type: ActionType.LOGIN,
      payload: {
        email: 'test@test.com',
        id: 1,
        name: 'Test',
        avatarUrl: 'http://abc.com/img.img',
        isPro: false,
      },
    };

    expect(user(state, setLoginAction))
      .toEqual({
        user: {
          email: 'test@test.com',
          id: 1,
          name: 'Test',
          avatarUrl: 'http://abc.com/img.img',
          isPro: false,
          loginError: '',
        },
      });
  });

  it('should reset user state after successful logout', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.AUTH,
      user: {
        email: 'test@test.com',
        id: 1,
        name: 'Test',
        avatarUrl: 'http://abc.com/img.img',
        isPro: false,
        loginError: '',
      },
    };

    const setLogoutAction = {
      type: ActionType.LOGOUT,
    };

    expect(user(state, setLogoutAction))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        user: {
          email: '',
          id: null,
          name: '',
          avatarUrl: '',
          isPro: false,
          loginError: '',
        },
      });
  });

  it('should set login error', () => {
    const state = {
      user: {
        loginError: '',
      },
    };

    const setErrorAction = {
      type: ActionType.SET_ERROR,
      payload: '401',
    };

    expect(user(state, setErrorAction))
      .toEqual({user: {loginError: '401'}});
  });

  it('should reset login error', () => {
    const state = {
      user: {
        loginError: '401',
      },
    };

    const setErrorAction = {
      type: ActionType.RESET_ERROR,
    };

    expect(user(state, setErrorAction))
      .toEqual({user: {loginError: ''}});
  });
});
