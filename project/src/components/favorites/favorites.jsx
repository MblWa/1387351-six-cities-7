import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header/header';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import FavoritesList from '../favorites-list/favorites-list';
import offerProp from '../../prop-types/offer.prop';

function Favorites({ offers }) {
  const { ROOT } = AppRoute;
  const offersByCity = {};

  offers.forEach((offer) => {
    if (!offersByCity[offer.city.name]) {
      offersByCity[offer.city.name] = [offer];
    } else {
      offersByCity[offer.city.name].push(offer);
    }
  });

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.entries(offersByCity).map(
                ([city, offersBycity], i) => <FavoritesList key={city + i.toString()} city={city} offers={offersBycity} />,
              )}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={ROOT}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

Favorites.propTypes = {
  offers: PropTypes.arrayOf(offerProp).isRequired,
};

export default Favorites;
