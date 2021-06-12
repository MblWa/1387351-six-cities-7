import React from 'react';
import PropTypes from 'prop-types';
import FavoritesCard from '../favorites-card/favorites-card';
import offerProp from '../../prop-types/offer.prop';

function FavoritesList({ city, offers }) {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
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
