import React, { useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../alert/alert';
import Header from '../header/header';
import { login } from '../../store/api-actions';
import { AppRoute } from '../../const';
import { resetError, setError } from '../../store/action';
import { getCity } from '../../store/ui-interaction/selectors';
import { getUserLoginError } from '../../store/user/selectors';
import { isValidEmail, isValidPassword } from '../../util';

function SignIn() {
  const error = useSelector(getUserLoginError);
  const selectedCity = useSelector(getCity);
  const dispatch = useDispatch();
  const loginRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();

  const onAlertClick = () => {
    dispatch(resetError());
  };

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    if (isValidEmail(loginRef.current.value) && isValidPassword(passwordRef.current.value)) {
      dispatch(resetError());
      dispatch(login({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      }, () => history.push(AppRoute.ROOT)));
    } else {
      dispatch(setError('Bad login or password'));
    }
  };

  return (
    <div className="page page--gray page--login">
      <Header />
      {error && <Alert errorText={error} onClick={() => onAlertClick()} />}
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleFormSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email" name="email"
                  placeholder="Email"
                  required
                  ref={loginRef}
                  data-testid="login"
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  ref={passwordRef}
                  data-testid="password"
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                data-testid="submit-button"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.ROOT}>
                <span>{selectedCity.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default SignIn;
