import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import {
  login,
  logout,
  requireAuthorization,
  resetError,
  setError,
  setCommentError,
  resetCommentError
} from '../action';

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
    commentError: '',
  },
};

const user = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(login, (state, action) => {
      state.user = {
        ...action.payload,
        loginError: '',
        commentError: '',
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
        commentError: '',
      };
    })
    .addCase(setError, (state, action) => {
      state.user.loginError = action.payload;
    })
    .addCase(resetError, (state, action) => {
      state.user.loginError = '';
    })
    .addCase(setCommentError, (state, action) => {
      state.user.commentError = action.payload;
    })
    .addCase(resetCommentError, (state) => {
      state.user.commentError = '';
    });
});

export { user };
