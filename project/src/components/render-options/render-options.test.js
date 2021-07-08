import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import RenderOptions from './render-options';
import { SortByOptions } from '../../const';

const mockStore = configureStore({});

describe('Component: RenderOptions', () => {
  it('should render correctly', () => {
    const state = {
      UI: { sortBy: SortByOptions.POPULAR },
    };

    render(
      <Provider store={mockStore(state)}>
        <BrowserRouter >
          <RenderOptions />
        </BrowserRouter>
      </Provider>,
    );

    const selectorElements = screen.getAllByTestId('sort-option');
    expect(selectorElements).toHaveLength(Object.values(SortByOptions).length);

    const currentSortElements = screen.getAllByText(state.UI.sortBy);
    expect(currentSortElements).toHaveLength(2);
  });
});
