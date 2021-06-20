import React from 'react';
import PropTypes from 'prop-types';
import Card from '../card/card';
import { offerProp } from '../../prop-types/props';

function OffersList({ offers, onMouseOver, className }) {

  return (
    <div className={className}>
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
  className: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(offerProp).isRequired,
  onMouseOver: PropTypes.func,
};

Card.defaultProps = {
  onMouseOver: () => {},
};

export default OffersList;
