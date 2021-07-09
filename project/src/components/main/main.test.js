import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import Main from './main';
import { AuthorizationStatus } from '../../const';

const mockStore = configureStore({});

describe('Component: Main', () => {
  it('should render correctly', () => {
    const user = {
      authorizationStatus: AuthorizationStatus.AUTH,
      user: {
        email: 'test@test.ru',
        loginError: '',
      },
    };
    const city = {
      name: 'Cologne',
      location: {
        latitude: 50.938361,
        longitude: 6.959974,
        zoom: 13,
      },
    };
    const offer = {
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
    };

    const state = {
      DATA: {
        offers: [offer],
      },
      UI: {
        city,
        sortBy: 'Popular',
      },
      USER: user,
    };

    const { getByRole } = render(
      <Provider store={mockStore(state)}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </Provider>,
    );

    const mainElement = getByRole('main');
    expect(mainElement).toBeInTheDocument();
  });
});
