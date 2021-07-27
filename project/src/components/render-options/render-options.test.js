import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import * as Redux from 'react-redux';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import RenderOptions from './render-options';
import { SortByOptions } from '../../const';
import { ActionType } from '../../store/action';

const mockStore = configureStore({});

describe('Component: RenderOptions', () => {
  it('should render correctly options and dispatch action on click', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

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

    selectorElements.forEach((selector, index) => {
      userEvent.click(selector);
      expect(dispatch).toBeCalled();
      expect(dispatch).nthCalledWith(index + 1, {
        type: ActionType.SORT_OFFERS,
        payload: selector.textContent,
      });
    });
  });
});
