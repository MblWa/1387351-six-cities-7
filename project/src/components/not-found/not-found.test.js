import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFound from './not-found';
import { testAuthUser } from '../../test-mocks/test-mocks';
const mockStore = configureStore({});

describe('Component: NotFound', () => {
  it('should render correctly', () => {
    const state = {
      USER: testAuthUser,
    };

    const {getByText} = render(
      <Provider store={mockStore(state)}>
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      </Provider>,
    );

    const linkElement = getByText('Return to main page');
    expect(linkElement).toBeInTheDocument();
  });
});
