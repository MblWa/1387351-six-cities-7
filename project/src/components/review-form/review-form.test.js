import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import ReviewForm from './review-form';
import { Rating } from '../../const';

const mockStore = configureStore({});

describe('Component: ReviewForm', () => {
  it('should render correctly', () => {
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
    };

    render(
      <Provider store={mockStore(state)}>
        <BrowserRouter >
          <ReviewForm />
        </BrowserRouter>
      </Provider>,
    );

    const starElements = screen.getAllByTestId('rating-input');
    expect(starElements).toHaveLength(Rating.MAXIMUM_RATING);

    const textareaElement = screen.getByTestId('review-textarea');
    expect(textareaElement).toBeInTheDocument();

    userEvent.type(screen.getByTestId('review-textarea'), 'SAMPLE_TEXT');
    expect(screen.getByDisplayValue(/SAMPLE_TEXT/i)).toBeInTheDocument();
  });
});
