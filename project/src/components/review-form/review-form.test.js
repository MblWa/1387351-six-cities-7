import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import ReviewForm from './review-form';
import { Rating } from '../../const';
import { testOffers } from '../../test-mocks/test-mocks';

const mockStore = configureStore({});

describe('Component: ReviewForm', () => {
  it('should render correctly', () => {
    const [ room ] = testOffers;

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
