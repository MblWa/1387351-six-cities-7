import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FavoritesCard from './favorites-card';
import { capitalize } from '../../util';

const mockStore = configureStore({});

describe('Component: FavoritesCard', () => {
  it('should render correctly', () => {
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

    const state = {};

    const {getByText} = render(
      <Provider store={mockStore(state)}>
        <BrowserRouter>
          <FavoritesCard
            offer={offer}
          />
        </BrowserRouter>
      </Provider>,
    );

    const previewImageElement = screen.getByRole('img');
    expect(previewImageElement).toHaveAttribute('src', `${offer.previewImage}`);
    expect(previewImageElement).toHaveAttribute('alt', 'Place to rent');

    const favoriteButtonElement = screen.getByRole('button');
    expect(favoriteButtonElement).toHaveAttribute('class', 'place-card__bookmark-button place-card__bookmark-button--active button');

    const priceCurrenctElement = getByText(/€/i);
    expect(priceCurrenctElement).toBeInTheDocument();

    const priceValueRegex = new RegExp(offer.price.toString(),'i');
    const priceValueElement = getByText(priceValueRegex);
    expect(priceValueElement).toBeInTheDocument();

    const titleElement = getByText(`${offer.title}`);
    expect(titleElement).toBeInTheDocument();

    const ratingElement = getByText(capitalize('Rating'));
    expect(ratingElement).toBeInTheDocument();
  });
});
