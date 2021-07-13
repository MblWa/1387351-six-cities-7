import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FavoritesCard from './favorites-card';
import { capitalize } from '../../util';
import { testOffers } from '../../test-mocks/test-mocks';

const mockStore = configureStore({});

describe('Component: FavoritesCard', () => {
  it('should render correctly', () => {
    const [ offer ] = testOffers;

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
