import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Alert from '../alert/alert';
import Header from '../header/header';
import { login } from '../../store/api-actions';
import { cityProp } from '../../prop-types/props';
import { AppRoute } from '../../const';
import { resetError } from '../../store/action';

function SignIn({ error, selectedCity, onSubmit, onClick }) {
  const loginRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit({
      login: loginRef.current.value,
      password: passwordRef.current.value,
    }, () => history.push(AppRoute.ROOT));
  };

  return (
    <div className="page page--gray page--login">
      <Header />
      {error && <Alert onClick={() => onClick()} />}
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit} >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email" name="email"
                  placeholder="Email"
                  required
                  ref={loginRef}
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
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
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

SignIn.propTypes = {
  error: PropTypes.string.isRequired,
  selectedCity: cityProp,
  onSubmit: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  error: state.user.loginError,
  selectedCity: state.city,
});


const mapDispatchToProps = (dispatch) => ({
  onSubmit(authData, cb) {
    dispatch(login(authData, cb));
  },
  onClick() {
    dispatch(resetError());
  },
});

export { SignIn };
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
