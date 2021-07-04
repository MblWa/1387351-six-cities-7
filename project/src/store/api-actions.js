import {
  loadOffers,
  loadRoom,
  loadComments,
  loadOffersNearby,
  loadFavorites,
  updateOffer,
  requireAuthorization,
  login as openSession,
  setError,
  logout as closeSession,
  resetOffers
} from './action';
import { setApiHeadersWithToken } from '../util';
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

export const fetchFavorites = () => (dispatch, _getState, api) => {
  setApiHeadersWithToken(api);
  api.get(APIRoute.FAVORITE)
    .then(({ data }) => dispatch(loadFavorites(data)))
    .catch(() => {});
};

export const checkAuth = () => (dispatch, _getState, api) => {
  setApiHeadersWithToken(api);
  api.get(APIRoute.LOGIN)
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {});
};

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

export const postComment = ({comment, rating}, id) => (dispatch, _getState, api) => {
  setApiHeadersWithToken(api);
  api.post(APIRoute.COMMENTS + id.toString(), { comment, rating })
    .then(({ data }) => dispatch(loadComments(data)))
    .catch(() => {});
};

export const postFavorite = (id, status, cb) => (dispatch, _getState, api) => {
  setApiHeadersWithToken(api);
  api.post(`${APIRoute.FAVORITE}/${id}/${status ? 1 : 0}`)
    .then(({ data }) => dispatch(updateOffer(data)))
    .catch(() => cb());
};

export const logout = () => (dispatch, _getState, api) => {
  setApiHeadersWithToken(api);
  api.delete(APIRoute.LOGOUT)
    .then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    })
    .then(() => dispatch(closeSession()))
    .then(() => dispatch(resetOffers()))
    .then(() => dispatch(fetchOffersList()));
};
