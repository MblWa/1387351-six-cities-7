import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app/app';
import { createAPI } from './services/api';
import rootReducer from './store/root-reducer';
import { requireAuthorization } from './store/action';
import { checkAuth, fetchOffersList } from './store/api-actions';
import { AuthorizationStatus } from './const';

const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH)),
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

store.dispatch(checkAuth());
store.dispatch(fetchOffersList());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
