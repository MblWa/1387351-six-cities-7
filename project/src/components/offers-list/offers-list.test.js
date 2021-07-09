import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import OffersList from './offers-list';

const mockStore = configureStore({});

describe('Component: OffersList', () => {
  it('should render correctly', () => {
    const state = {};
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

    render(
      <Provider store={mockStore(state)}>
        <BrowserRouter >
          <OffersList
            className="cities__places-list places__list tabs__content"
            offers={offers}
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
          />
        </BrowserRouter>
      </Provider>,
    );

    const listElement = screen.getByTestId('offers-list-container');
    expect(listElement).toHaveAttribute('class', 'cities__places-list places__list tabs__content');

    const cardElement = screen.getByRole('article');
    expect(cardElement).toBeInTheDocument();
  });
});
