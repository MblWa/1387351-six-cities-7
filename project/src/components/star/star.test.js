import React from 'react';
import { render, screen } from '@testing-library/react';
import Star from './star';

describe('Component: LoadingScreen', () => {
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
});
