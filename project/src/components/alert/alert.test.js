import React from 'react';
import { render } from '@testing-library/react';
import Alert from './alert';

describe('Component: Alert', () => {
  it('should render correctly', () => {
    const {getByText} = render(
      <Alert errorText={'error message'} onClick={() => {}}/>,
    );

    const errorElement = getByText('error message');

    expect(errorElement).toBeInTheDocument();
  });
});
