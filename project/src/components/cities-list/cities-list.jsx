import React,  { useState }  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import OffersList from '../offers-list/offers-list';
import Map from '../map/map';
import RenderOptions from '../render-options/render-options';
import { changeCity } from '../../store/action';
import { getCity, getSortBy } from '../../store/ui-interaction/selectors';
import { getSortedOffers } from '../../store/app-data/selectors';
import { selectPluralFormForNoun } from '../../util';
import { cityProp, offerProp } from '../../prop-types/props';
import { AppRoute, CITIES_LIST } from '../../const';

function CitiesList({ selectedCity, sortBy, selectedOffers, onCityClick }) {
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
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offersCount} {selectPluralFormForNoun(offersCount, 'place', 'places')} to stay in {selectedCity.name}</b>
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
            <section className="cities__map map">
              <Map city={selectedCity} offers={selectedOffers} selectedOffer={selectedOffer} />
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  selectedOffers: getSortedOffers(state),
  selectedCity: getCity(state),
  sortBy: getSortBy(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick(evt) {
    const city = CITIES_LIST[evt.target.textContent.toUpperCase()];
    dispatch(changeCity(city));
  },
});

CitiesList.propTypes = {
  selectedOffers: PropTypes.arrayOf(offerProp).isRequired,
  selectedCity: cityProp,
  sortBy: PropTypes.string.isRequired,
  onCityClick: PropTypes.func.isRequired,
};

export { CitiesList };
export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
