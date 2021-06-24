import React from 'react';
import PropTypes from 'prop-types';
import Card from '../card/card';
import { offerProp } from '../../prop-types/props';

function OffersList({ offers, onMouseEnter, onMouseLeave, className }) {

  return (
    <div className={className}>
      {offers.map((offer) =>
        (
          <Card
            key={offer.id}
            offer={offer}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
        ))}
    </div>
  );
}

OffersList.propTypes = {
  className: PropTypes.string.isRequired,
  offers: PropTypes.arrayOf(offerProp).isRequired,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

Card.defaultProps = {
  onMouseEnter: () => {},
  onMouseLeave: () => {},
};

export default OffersList;
