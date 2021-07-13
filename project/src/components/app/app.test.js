import React from 'react';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { AppRoute} from '../../const';
import App from './app';
import { testOffers, testNotAuthUser, testCity } from '../../test-mocks/test-mocks';

let store = null;
let fakeApp = null;
const history = createMemoryHistory();

describe('Application Routing', () => {
  beforeAll(() => {
    const createFakeStore = configureStore({});
    store = createFakeStore({
      USER: testNotAuthUser,
      DATA: {
        offers: testOffers,
        offersNearBy: testOffers,
        isOffersLoaded: true,
        room: testOffers[0],
        favorites: [],
        isFavoritesLoaded: false,
        isRoomLoaded: true,
        comments: [],
      },
      UI: {
        city: testCity,
        sortBy: 'Popular',
      },
    });

    fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
  });

  it('redirects to ROOT when user navigate to "/"', () => {
    render(fakeApp);

    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
  });

  it('redirects to LOGIN when user navigate to "/login"', () => {
    history.push(AppRoute.LOGIN);
    render(fakeApp);

    const signInButtonElement = screen.getByTestId('submit-button');
    expect(signInButtonElement).toBeInTheDocument();
    const loginElement = screen.getByTestId('login');
    expect(loginElement).toBeInTheDocument();
    const passwordElement = screen.getByTestId('password');
    expect(passwordElement).toBeInTheDocument();

    userEvent.type(screen.getByTestId('login'), 'test@test.ru');
    userEvent.type(screen.getByTestId('password'), '1234567890');
    expect(screen.getByDisplayValue(/test@test.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/1234567890/i)).toBeInTheDocument();
  });

  it('redirects to NOT FOUND when user navigate to unexistent route', () => {
    history.push(AppRoute.NOT_FOUND);
    render(fakeApp);

    const linkElement = screen.getByText('Return to main page');
    expect(linkElement).toBeInTheDocument();
  });
});
