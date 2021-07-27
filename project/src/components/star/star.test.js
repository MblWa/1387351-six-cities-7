import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Star from './star';

describe('Component: Star', () => {
  it('should render correctly', () => {
    const testindex = 1;
    const testTitle = 'title';

    render(
      <Star index={testindex} title={testTitle} onChange={() => {}}/>,
    );

    const ratingInputElement = screen.getByTestId('rating-input');
    expect(ratingInputElement).toBeInTheDocument();

    const ratingLabelElement = screen.getByTestId('rating-label');
    expect(ratingLabelElement).toBeInTheDocument();
  });

  it('should be checked when clicked', () => {
    const testindex = 1;
    const testTitle = 'title';

    render(
      <Star index={testindex} title={testTitle} onChange={() => {}}/>,
    );

    const ratingInputElement = screen.getByTestId('rating-input');
    expect(ratingInputElement).not.toBeChecked();
    userEvent.click(ratingInputElement);
    expect(ratingInputElement).toBeChecked();
  });
});
