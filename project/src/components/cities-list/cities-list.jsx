import React,  { useState }  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OffersList from '../offers-list/offers-list';
import Map from '../map/map';
import RenderOptions from '../render-options/render-options';
import { changeCity, selectOffers } from '../../store/action';
import { offerProp, cityProp } from '../../prop-types/props';
import { CITIES_LIST } from '../../const';
import { selectPluralFormForNoun } from '../../util';

function CitiesList({ selectedCity, selectedOffers, onCityClick }) {
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
                <a
                  href="#"
                  className={selectedCity.name === city.name ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'}
                >
                  <span>{city.name}</span>
                </a>
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
  selectedCity: state.city,
  selectedOffers: state.offers,
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick(evt) {
    const city = CITIES_LIST[evt.target.textContent.toUpperCase()];
    dispatch(changeCity(city));
    dispatch(selectOffers(city));
  },
});

CitiesList.propTypes = {
  selectedCity: cityProp,
  onCityClick: PropTypes.func.isRequired,
  selectedOffers: PropTypes.arrayOf(offerProp).isRequired,
};

export { CitiesList };
export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
