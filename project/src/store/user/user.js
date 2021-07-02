import { createReducer } from '@reduxjs/toolkit';
import { adaptUserKeys } from '../../util';
import { AuthorizationStatus } from '../../const';
import { login, logout, requireAuthorization, resetError, setError } from '../action';

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

const user = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(login, (state, action) => {
      state.user = {
        ...adaptUserKeys(action.payload),
        loginError: '',
      };
    })
    .addCase(logout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      state.user = {
        email: '',
        id: null,
        name: '',
        avatarUrl: '',
        isPro: false,
        loginError: '',
      };
    })
    .addCase(setError, (state, action) => {
      state.user.loginError = action.payload;
    })
    .addCase(resetError, (state, action) => {
      state.user.loginError = '';
    });
});

export { user };
