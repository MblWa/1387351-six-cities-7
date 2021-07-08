import React from 'react';
import { render } from '@testing-library/react';
import Alert from './alert';

describe('Component: Alert', () => {
  it('should render correctly', () => {
    const {getByText} = render(
      <Alert onClick={() => {}}/>,
    );

    const errorElement = getByText('Failed to login: bad email or no password provided. Please, try again.');

    expect(errorElement).toBeInTheDocument();
  });
});
