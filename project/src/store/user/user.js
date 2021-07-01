import { ActionType } from '../action';
import { adaptUserKeys } from '../../util';
import { AuthorizationStatus } from '../../const';

const userLocalStorage = JSON.parse(localStorage.getItem('user')) ?? {};

const initialState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  user: {
    email: userLocalStorage.email ?? '',
    id: userLocalStorage.id ?? null,
    name: userLocalStorage.name ?? '',
    avatarUrl: userLocalStorage.avatar_url ?? '',
    isPro: userLocalStorage.is_pro ?? false,
    loginError: '',
  },
};

const user = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.status,
      };
    case ActionType.LOGIN:
      return {
        ...state,
        user: {
          ...adaptUserKeys(action.user),
          loginError: '',
        },
      };
    case ActionType.LOGOUT:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        user: {
          email: '',
          id: null,
          name: '',
          avatarUrl: '',
          isPro: false,
          loginError: '',
        },
      };
    case ActionType.SET_ERROR:
      return {
        ...state,
        user: {
          ...state.user,
          loginError: action.error,
        },
      };
    case ActionType.RESET_ERROR:
      return {
        ...state,
        user: {
          ...state.user,
          loginError: '',
        },
      };
    default:
      return state;
  }
};

export { user };
