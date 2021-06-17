import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { offerProp } from '../../prop-types/props';
import useMap from '../../hooks/useMap';
import leaflet from 'leaflet';
import { DEFAULT_CUSTOM_ICON, ACTIVE_CUSTOM_ICON } from '../../const';

function Map({ city, offers, selectedOffer }) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);


  useEffect(() => {
    const defaultCustomIcon = leaflet.icon(DEFAULT_CUSTOM_ICON);
    const activeCustomIcon = leaflet.icon(ACTIVE_CUSTOM_ICON);

    if (map) {
      offers.forEach((offer) => {
        const { latitude, longitude } = offer.location;
        const { id } = offer;
        leaflet
          .marker({
            lat: latitude,
            lng: longitude,
          }, {
            icon: id === selectedOffer.offerId ? activeCustomIcon : defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, offers, selectedOffer]);

  return (
    <div
      style={{height: '100%'}}
      ref={mapRef}
    >

    </div>
  );
}

Map.propTypes = {
  selectedOffer: PropTypes.shape({
    offerId: PropTypes.number,
  }).isRequired,
  offers: PropTypes.arrayOf(offerProp).isRequired,
  city: PropTypes.shape({
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

Map.defaultProps = {
  selectedOffer: { offerId: null },
};

export default Map;
