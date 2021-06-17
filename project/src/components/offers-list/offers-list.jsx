import React from 'react';
import PropTypes from 'prop-types';
import Card from '../card/card';
import { offerProp } from '../../prop-types/props';

function OffersList({ offers, onMouseOver }) {

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) =>
        (
          <Card
            key={offer.id}
            offer={offer}
            onMouseOver={onMouseOver}
          />
        ))}
    </div>
  );
}

OffersList.propTypes = {
  offers: PropTypes.arrayOf(offerProp).isRequired,
  onMouseOver: PropTypes.func.isRequired,
};

export default OffersList;
