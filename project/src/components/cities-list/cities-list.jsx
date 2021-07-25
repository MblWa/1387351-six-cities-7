import React,  { useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import OffersList from '../offers-list/offers-list';
import Map from '../map/map';
import RenderOptions from '../render-options/render-options';
import EmptyOffersList from '../empty-offers-list/empty-offers-list';
import { changeCity } from '../../store/action';
import { getCity } from '../../store/ui-interaction/selectors';
import { getSortedOffers } from '../../store/app-data/selectors';
import { selectPluralFormForNoun } from '../../util';
import { AppRoute, CITIES_LIST } from '../../const';

function CitiesList() {
  const selectedOffers = useSelector(getSortedOffers);
  const selectedCity = useSelector(getCity);

  const dispatch = useDispatch();

  const onCityClick = (evt) => {
    const city = CITIES_LIST[evt.target.textContent.toUpperCase()];
    dispatch(changeCity(city));
  };

  const [selectedOffer, setSelectedOffer] = useState({id: null});
  const offersCount = selectedOffers.length;

  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {Object.values(CITIES_LIST).map((city) => (
              <li className="locations__item" key={city.name} onClick={onCityClick}>
                <Link
                  to={AppRoute.ROOT}
                  className={selectedCity.name === city.name ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'}
                  data-testid={city.name}
                >
                  <span>{city.name}</span>
                </Link>
              </li>
            ),
            )}
          </ul>
        </section>
      </div>
      <div className="cities">
        {offersCount === 0
          ? <EmptyOffersList />
          : (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {offersCount} {selectPluralFormForNoun(offersCount, 'place', 'places')} to stay in {selectedCity.name}
                </b>
                <RenderOptions />
                <OffersList
                  className="cities__places-list places__list tabs__content"
                  offers={selectedOffers}
                  onMouseEnter={(selectedId) => {
                    setSelectedOffer({...selectedOffer, id: selectedId});
                  }}
                  onMouseLeave={() => {
                    setSelectedOffer({...selectedOffer, id: null});
                  }}
                />
              </section>
              <div className="cities__right-section">
                <section className="cities__map map" data-testid="map">
                  <Map city={selectedCity} offers={selectedOffers} selectedOffer={selectedOffer} />
                </section>
              </div>
            </div>
          )}
      </div>
    </>
  );
}

export default CitiesList;
