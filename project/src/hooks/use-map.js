import { useEffect, useState } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

function useMap(mapRef, city) {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const { latitude, longitude, zoom } = city.location;

    if (mapRef.current !== null && map === null) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: latitude,
          lng: longitude,
        },
        zoom: zoom,
      });

      leaflet.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      )
        .addTo(instance);
      setMap(instance);
    }

    if (map !== null) {
      map.panTo([latitude, longitude], zoom);
    }

  }, [mapRef, map, city]);

  return map;
}

export default useMap;
