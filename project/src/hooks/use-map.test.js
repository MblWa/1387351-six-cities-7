import { renderHook } from '@testing-library/react-hooks';
import useMap from './use-map';
import { testCity } from '../test-mocks/test-mocks';

describe('Hook: useMap', () => {
  it('should be instance of object', () => {
    const mapRef = null;
    const { result } = renderHook(() => useMap(mapRef, testCity));

    expect(result).toBeInstanceOf(Object);
  });

  it('should be return instance of leaflet map with markerLayer and centered', () => {
    const element = document.createElement('div');
    const mapContatiner = {
      current: element,
    };

    const { result } = renderHook(() => useMap(mapContatiner, testCity));

    expect(result.current._container).toHaveTextContent('Leaflet | © OpenStreetMap contributors © CARTO');
    expect(result.current._container.childNodes[0].childNodes[3]).toHaveClass('leaflet-pane leaflet-marker-pane');
    expect(result.current.options.center.lat).toEqual(testCity.location.latitude);
    expect(result.current.options.center.lng).toEqual(testCity.location.longitude);
  });
});
