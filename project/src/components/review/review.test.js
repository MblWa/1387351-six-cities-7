import React from 'react';
import { render, screen } from '@testing-library/react';
import Review from './review';
import { convertDateToMonthAndDate } from '../../util';

describe('Component: CitiesList', () => {
  it('should render correctly', () => {
    const review = {
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
    };

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
