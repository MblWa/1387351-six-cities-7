import React from 'react';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { AuthorizationStatus, AppRoute} from '../../const';
import App from './app';

let store = null;
let fakeApp = null;
const history = createMemoryHistory();

describe('Application Routing', () => {
  beforeAll(() => {
    const offers = [{
      city: {
        name: 'Cologne',
        location: {
          latitude: 50.938361,
          longitude: 6.959974,
          zoom: 13,
        },
      },
      previewImage: 'https://7.react.pages.academy/static/hotel/2.jpg',
      images: [
        'https://7.react.pages.academy/static/hotel/11.jpg',
      ],
      title: 'Perfectly located Castro',
      isFavorite: false,
      isPremium: true,
      rating: 3.4,
      type: 'apartment',
      bedrooms: 3,
      maxAdults: 6,
      price: 301,
      goods: [
        'Air conditioning',
        'Washer',
        'Laptop friendly workspace',
        'Breakfast',
      ],
      host: {
        id:25,
        name: 'Angelina',
        isPro: true,
        avatarUrl: 'img/avatar-angelina.jpg',
      },
      description: 'A new spacious villa, one floor. All commodities, jacuzzi and beautiful scenery. Ideal for families or friends.',
      location: {
        latitude: 50.917361,
        longitude: 6.977974,
        zoom: 16,
      },
      id: 1,
    }];
    const city = {
      name: 'Cologne',
      location: {
        latitude: 50.938361,
        longitude: 6.959974,
        zoom: 13,
      },
    };
    const user = {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      user: {
        email: 'test@test.ru',
        id: 1,
        name: 'test',
        isPro: false,
        avatarUrl: 'img/img.img',
        loginError: '',
      },
    };

    const createFakeStore = configureStore({});
    store = createFakeStore({
      USER: user,
      DATA: {
        offers,
        offersNearBy: offers,
        isOffersLoaded: true,
        room: offers[0],
        favorites: [],
        isFavoritesLoaded: false,
        isRoomLoaded: true,
        comments: [],
      },
      UI: {
        city,
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
