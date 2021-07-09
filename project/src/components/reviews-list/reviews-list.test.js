import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import ReviewsList from './reviews-list';
import { AuthorizationStatus } from '../../const';

const mockStore = configureStore({});

describe('Component: ReviewsList', () => {
  it('should render correctly reviews and review form if AUTH', () => {
    const reviews = [
      {
        comment: 'Bathed in the nature. Completely unplugged. Unforgettable.',
        date: '2021-07-03T13:27:50.244Z',
        id: 1,
        rating: 3,
        user: {
          id: 19,
          name: 'Christina',
          avatarUrl: 'https://7.react.pages.academy/static/avatar/10.jpg',
          isPro: false,
        },
      },
      {
        comment: 'Bathed in the nature. Completely unplugged. Unforgettable.',
        date: '2021-07-03T13:27:50.244Z',
        id: 2,
        rating: 3,
        user: {
          id: 19,
          name: 'Christina',
          avatarUrl: 'https://7.react.pages.academy/static/avatar/10.jpg',
          isPro: false,
        },
      },
    ];
    const room = {
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
      DATA: { room },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
    };

    render(
      <Provider store={mockStore(state)}>
        <BrowserRouter >
          <ReviewsList reviews={reviews}/>
        </BrowserRouter>
      </Provider>,
    );

    const reviewElements = screen.getAllByTestId('review');
    expect(reviewElements).toHaveLength(reviews.length);

    const reviewFormElement = screen.getByTestId('review-textarea');
    expect(reviewFormElement).toBeInTheDocument();
  });

  it('should render correctly without review form if not AUTH', () => {
    const reviews = [
      {
        comment: 'Bathed in the nature. Completely unplugged. Unforgettable.',
        date: '2021-07-03T13:27:50.244Z',
        id: 1,
        rating: 3,
        user: {
          id: 19,
          name: 'Christina',
          avatarUrl: 'https://7.react.pages.academy/static/avatar/10.jpg',
          isPro: false,
        },
      },
      {
        comment: 'Bathed in the nature. Completely unplugged. Unforgettable.',
        date: '2021-07-03T13:27:50.244Z',
        id: 2,
        rating: 3,
        user: {
          id: 19,
          name: 'Christina',
          avatarUrl: 'https://7.react.pages.academy/static/avatar/10.jpg',
          isPro: false,
        },
      },
    ];
    const room = {
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
      DATA: { room },
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      },
    };

    render(
      <Provider store={mockStore(state)}>
        <BrowserRouter >
          <ReviewsList reviews={reviews}/>
        </BrowserRouter>
      </Provider>,
    );

    const reviewElements = screen.getAllByTestId('review');
    expect(reviewElements).toHaveLength(reviews.length);

    const reviewFormElement = screen.queryByTestId('review-textarea');
    expect(reviewFormElement).toBeNull();
  });
});
