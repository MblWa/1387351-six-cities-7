import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../header/header';
import FavoritesList from '../favorites-list/favorites-list';
import LoadingScreen from '../loading-screen/loading-screen';
import { getFavorites, getFavoritesLoadedStatus } from '../../store/app-data/selectors';
import { AppRoute } from '../../const';
import { fetchFavorites } from '../../store/api-actions';
import { isNestedArraysEmpty } from '../../util';

function Favorites() {
  const { ROOT } = AppRoute;
  const offers = useSelector(getFavorites);
  const isFavoritesLoaded = useSelector(getFavoritesLoadedStatus);
  const dispatch = useDispatch();
  const isNoFavorites = isNestedArraysEmpty(offers);

  useEffect(() => {
    if (!isFavoritesLoaded) {
      dispatch(fetchFavorites());
    }
  }, [isFavoritesLoaded, dispatch]);

  if (!isFavoritesLoaded && isNoFavorites) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <div className={isNoFavorites ? 'page page--favorites-empty' : 'page'} >
      <Header />
      {isNoFavorites
        ? (
          <main className="page__main page__main--favorites page__main--favorites-empty">
            <div className="page__favorites-container container">
              <section className="favorites favorites--empty">
                <h1 className="visually-hidden">Favorites (empty)</h1>
                <div className="favorites__status-wrapper">
                  <b className="favorites__status">Nothing yet saved.</b>
                  <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
                </div>
              </section>
            </div>
          </main>
        )
        : (
          <main className="page__main page__main--favorites">
            <div className="page__favorites-container container">
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {Object.entries(offers).map(
                    ([city, offersBycity], i) => <FavoritesList key={city + i.toString()} city={city} offers={offersBycity} />,
                  )}
                </ul>
              </section>
            </div>
          </main>
        )}
      <footer className="footer container">
        <Link className="footer__logo-link" to={ROOT}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

export default Favorites;
