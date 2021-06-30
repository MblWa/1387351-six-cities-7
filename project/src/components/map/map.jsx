import React, { useRef, useEffect } from 'react';
import { offerProp, cityProp } from '../../prop-types/props';
import leaflet from 'leaflet';
import useMap from '../../hooks/useMap';
import PropTypes from 'prop-types';
import { DEFAULT_CUSTOM_ICON, ACTIVE_CUSTOM_ICON } from '../../const';

function Map({ city, offers, selectedOffer }) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const markerLayer = leaflet.layerGroup();

  useEffect(() => {
    const defaultCustomIcon = leaflet.icon(DEFAULT_CUSTOM_ICON);
    const activeCustomIcon = leaflet.icon(ACTIVE_CUSTOM_ICON);
    if (map) {
      markerLayer.addTo(map);

      offers.forEach((offer) => {
        const { latitude, longitude } = offer.location;
        const { id } = offer;
        leaflet
          .marker({
            lat: latitude,
            lng: longitude,
          }, {
            icon: id === selectedOffer.id ? activeCustomIcon : defaultCustomIcon,
          })
          .addTo(markerLayer);
      });
    }

    return () => {
      if (map) {
        markerLayer.clearLayers();
      }
    };
  }, [map, city, offers, selectedOffer, markerLayer]);

  return (
    <div
      style={{height: '100%', width: '100%'}}
      ref={mapRef}
    >

    </div>
  );
}

Map.propTypes = {
  selectedOffer: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  offers: PropTypes.arrayOf(offerProp).isRequired,
  city: cityProp,
};

Map.defaultProps = {
  selectedOffer: { offerId: null },
};

export default Map;
