import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingScreen from './loading-screen';

describe('Component: LoadingScreen', () => {
  it('should render correctly', () => {
    const {getByText} = render(
      <LoadingScreen />,
    );

    const loadingStatus = getByText('Loading...');
    expect(loadingStatus).toBeInTheDocument();

    const spinnerElement = screen.getByTestId('spinner-animation');
    expect(spinnerElement).toBeInTheDocument();
  });
});
