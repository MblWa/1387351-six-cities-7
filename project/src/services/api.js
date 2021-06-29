import axios from 'axios';

const BACKEND_URL = 'https://7.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;

const HttpCode = {
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
};

const token = localStorage.getItem('token') ?? '';

export const createAPI = (onUnauthorized, onBadRequest) => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
    headers: {
      'x-token': token,
    },
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    const { response } = err;

    switch (response.status) {
      case HttpCode.UNAUTHORIZED:
        onUnauthorized();
        break;
      case HttpCode.BAD_REQUEST:
        onBadRequest(`${response.status}`);
        break;
      default:
        throw err;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
