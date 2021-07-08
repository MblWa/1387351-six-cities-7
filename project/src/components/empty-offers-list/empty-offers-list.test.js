import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import EmptyOffersList from './empty-offers-list';

const mockStore = configureStore({});

describe('Component: EmptyOffersList', () => {
  it('should render correctly', () => {
    const state = {
      UI: {
        city: { name: 'Paris' },
      },
    };

    const {getByText} = render(
      <Provider store={mockStore(state)}>
        <EmptyOffersList />
      </Provider>,
    );

    const cityElement = getByText(`We could not find any property available at the moment in ${state.UI.city.name}`);

    expect(cityElement).toBeInTheDocument();
  });
});
