import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './components/app/app';
import { createAPI } from './services/api';
import { reducer } from './store/reducer';
import { ActionCreator } from './store/action';
import { checkAuth, fetchOffersList } from './store/api-actions';
import { AuthorizationStatus } from './const';

const api = createAPI(
  () => store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)),
);

const composeEnhancers = composeWithDevTools({trace: true, traceLimit: 25 });
const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk.withExtraArgument(api)),
  ),
);

store.dispatch(checkAuth());
store.dispatch(fetchOffersList());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
