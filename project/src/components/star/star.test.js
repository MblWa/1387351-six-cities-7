import React from 'react';
import { render, screen } from '@testing-library/react';
import Star from './star';

describe('Component: Star', () => {
  it('should render correctly', () => {
    const testindex = 1;
    const testTitle = 'title';

    render(
      <Star
        index={testindex}
        title={testTitle}
        onChange={() => {}}
        isDisabled={false}
        isChecked={false}
      />,
    );

    const ratingInputElement = screen.getByTestId('rating-input');
    expect(ratingInputElement).toBeInTheDocument();

    const ratingLabelElement = screen.getByTestId('rating-label');
    expect(ratingLabelElement).toBeInTheDocument();
  });
});
