import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import ReviewsList from './reviews-list';
import { testReviews, testOffers, testAuthUser, testNotAuthUser } from '../../test-mocks/test-mocks';

const mockStore = configureStore({});

describe('Component: ReviewsList', () => {
  it('should render correctly reviews and review form if AUTH', () => {
    const [ room ] = testOffers;

    const state = {
      DATA: { room },
      USER: testAuthUser,
    };

    render(
      <Provider store={mockStore(state)}>
        <BrowserRouter >
          <ReviewsList reviews={testReviews}/>
        </BrowserRouter>
      </Provider>,
    );

    const reviewElements = screen.getAllByTestId('review');
    expect(reviewElements).toHaveLength(testReviews.length);

    const reviewFormElement = screen.getByTestId('review-textarea');
    expect(reviewFormElement).toBeInTheDocument();
  });

  it('should render correctly without review form if not AUTH', () => {
    const [ room ] = testOffers;

    const state = {
      DATA: { room },
      USER: testNotAuthUser,
    };

    render(
      <Provider store={mockStore(state)}>
        <BrowserRouter >
          <ReviewsList reviews={testReviews}/>
        </BrowserRouter>
      </Provider>,
    );

    const reviewElements = screen.getAllByTestId('review');
    expect(reviewElements).toHaveLength(testReviews.length);

    const reviewFormElement = screen.queryByTestId('review-textarea');
    expect(reviewFormElement).toBeNull();
  });
});
