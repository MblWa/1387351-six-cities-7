import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import FavoritesCard from '../favorites-card/favorites-card';
import { offerProp } from '../../prop-types/props';
import { CITIES_LIST, AppRoute } from '../../const';
import { changeCity } from '../../store/action';

function FavoritesList({ city, offers }) {
  const dispatch = useDispatch();

  const handleCurrentCityChange = (target) => {
    const cityName = CITIES_LIST[target.toUpperCase()];
    dispatch(changeCity(cityName));
  };

  if (offers.length === 0) {
    return null;
  }

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link
            className="locations__item-link"
            to={AppRoute.ROOT}
            onClick={() => handleCurrentCityChange(city)}
            data-testid="city-link"
          >
            <span>{city}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer) => <FavoritesCard key={offer.id} offer={offer}/>)}
      </div>
    </li>
  );
}

FavoritesList.propTypes = {
  city: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(offerProp).isRequired,
};

export default FavoritesList;
