import { NameSpace } from '../root-reducer';

export const getAuthorizationStatus = (state) => state[NameSpace.USER].authorizationStatus;
export const getUserEmail = (state) => state[NameSpace.USER].user.email;
export const getUserLoginError = (state) => state[NameSpace.USER].user.loginError;
export const getCommentPostError = (state) => state[NameSpace.USER].user.commentError;
