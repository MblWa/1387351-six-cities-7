import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Route, Switch, Router, BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import NotFound from './not-found';
import { testAuthUser } from '../../test-mocks/test-mocks';
import { AppRoute } from '../../const';

const mockStore = configureStore({});
const history = createMemoryHistory();

describe('Component: NotFound', () => {
  it('should render correctly', () => {
    const state = {
      USER: testAuthUser,
    };

    const { getByText } = render(
      <Provider store={mockStore(state)}>
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      </Provider>,
    );

    const linkElement = getByText('Return to main page');
    expect(linkElement).toBeInTheDocument();
  });

  it('should redirect to root url when user clicks the link', () => {
    history.push('/fake');
    const state = {
      USER: testAuthUser,
    };

    render(
      <Provider store={mockStore(state)}>
        <Router history={history}>
          <Switch>
            <Route path={AppRoute.ROOT} exact>
              <h1>This is main page</h1>
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </Provider>);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    const linkElement = screen.getByText('Return to main page');
    userEvent.click(linkElement);
    expect(screen.queryByText(/This is main page/i)).toBeInTheDocument();
  });
});
