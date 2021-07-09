import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import CitiesList from './cities-list';
import { CITIES_LIST } from '../../const';
import { capitalize } from '../../util';

const mockStore = configureStore({});

describe('Component: CitiesList', () => {
  it('should render correctly', () => {
    const city = {
      name: 'Cologne',
      location: {
        latitude: 50.938361,
        longitude: 6.959974,
        zoom: 13,
      },
    };

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

    const state = {
      DATA: { offers },
      UI: { city },
    };

    render(
      <Provider store={mockStore(state)}>
        <BrowserRouter >
          <CitiesList />
        </BrowserRouter>
      </Provider>,
    );

    Object.keys(CITIES_LIST).forEach((cityName) => {
      const linkElement = screen.getByText(capitalize(cityName));
      expect(linkElement).toBeInTheDocument();
    });

    const mapElement = screen.getByTestId('map');
    expect(mapElement).toBeInTheDocument();


  });
});
