import {
  loadOffers,
  loadRoom,
  loadComments,
  loadOffersNearby,
  requireAuthorization,
  login as openSession,
  setError,
  logout as closeSession
} from './action';
import { AuthorizationStatus, APIRoute } from '../const';

export const fetchOffersList = () => (dispatch, _getState, api) => (
  api.get(APIRoute.OFFERS)
    .then(({ data }) => dispatch(loadOffers(data)))
);

export const fetchRoom = (id, cb) => (dispatch, _getState, api) => (
  api.get(APIRoute.ROOM + id.toString())
    .then(({ data }) => dispatch(loadRoom(data)))
    .catch(() => cb())
);

export const fetchComments = (id) => (dispatch, _getState, api) => (
  api.get(APIRoute.COMMENTS + id.toString())
    .then(({ data }) => dispatch(loadComments(data)))
    .catch(() => {})
);

export const fetchOffersNearby = (id) => (dispatch, _getState, api) => (
  api.get(APIRoute.ROOM + id.toString() + APIRoute.NEARBY)
    .then(({ data }) => dispatch(loadOffersNearby(data)))
    .catch(() => {})
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {})
);

export const login = ({ login: email, password }, cb) => (dispatch, _getState, api) => (
  api.post(APIRoute.LOGIN, { email, password })
    .then(({ data }) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      dispatch(openSession(data));
    })
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .then(() => cb())
    .catch(({response}) => dispatch(setError(`${response.status}`)))
);

export const postComment = ({comment, rating}, id) => (dispatch, _getState, api) => (
  api.post(APIRoute.COMMENTS + id.toString(), { comment, rating }, {headers: {'x-token': localStorage.getItem('token') ?? ''}})
    .then(({ data }) => dispatch(loadComments(data)))
    .catch(() => {})
);

export const logout = () => (dispatch, _getState, api) => (
  api.delete(APIRoute.LOGOUT)
    .then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    })
    .then(() => dispatch(closeSession()))
);
