import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from '../card/card';
import { offerProp } from '../../prop-types/props';

function OffersList({ offers }) {
  const [selectedCard, setSelectedCard] = useState({offerId: null});
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <Card key={offer.id} offer={offer} onMouseOver={(id) => setSelectedCard({...selectedCard, offerId: id})}/>)}
    </div>
  );
}

OffersList.propTypes = {
  offers: PropTypes.arrayOf(offerProp).isRequired,
};

export default OffersList;
