import React from 'react';
import { render, screen } from '@testing-library/react';
import Review from './review';
import { convertDateToMonthAndDate } from '../../util';
import { testReviews } from '../../test-mocks/test-mocks';

describe('Component: CitiesList', () => {
  it('should render correctly', () => {
    const [ review ] = testReviews;

    render(
      <Review review={review} />,
    );

    const avatarElement = screen.getByRole('img');
    expect(avatarElement).toHaveAttribute('src', `${review.user.avatarUrl}`);
    expect(avatarElement).toHaveAttribute('alt', 'Review avatar');

    const commentElement = screen.getByText(`${review.comment}`);
    expect(commentElement).toBeInTheDocument();

    const ratingElement = screen.getByText('Rating');
    expect(ratingElement).toBeInTheDocument();

    const timeElement = screen.getByText(convertDateToMonthAndDate(review.date));
    expect(timeElement).toBeInTheDocument();
  });
});
