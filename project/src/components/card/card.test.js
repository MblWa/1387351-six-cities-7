import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Card from './card';
import { capitalize } from '../../util';
import { testOffers } from '../../test-mocks/test-mocks';

const mockStore = configureStore({});

describe('Component: Card', () => {
  it('should render correctly', () => {
    const [offer] = testOffers;
    const state = {};

    const {getByText} = render(
      <Provider store={mockStore(state)}>
        <BrowserRouter>
          <Card
            offer={offer}
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
          />
        </BrowserRouter>
      </Provider>,
    );

    const priceCurrenctElement = getByText(/€/i);
    expect(priceCurrenctElement).toBeInTheDocument();

    const priceValueRegex = new RegExp(offer.price.toString(),'i');
    const priceValueElement = getByText(priceValueRegex);
    expect(priceValueElement).toBeInTheDocument();

    const previewImageElement = screen.getByRole('img');
    expect(previewImageElement).toHaveAttribute('src', `${offer.previewImage}`);
    expect(previewImageElement).toHaveAttribute('alt', 'Place to rent');

    const titleElement = getByText(`${offer.title}`);
    expect(titleElement).toBeInTheDocument();

    const titleType = getByText(capitalize(offer.type));
    expect(titleType).toBeInTheDocument();
  });
});
