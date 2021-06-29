import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import Header from '../header/header';
import ReviewsList from '../reviews-list/reviews-list';
import OffersList from '../offers-list/offers-list';
import Map from '../map/map';
import { reviewProp, offerProp } from '../../prop-types/props';
import { capitalize, calculateRatingPercent } from '../../util';
import { MAXIMUM_NEARBY_OFFERS_COUNT } from '../../const';

function Room({ offers, reviews }) {
  const { id } = useParams();
  const room = offers.find((offer) => offer.id === Number(id));

  const {
    city,
    images,
    type,
    isPremium,
    description,
    isFavorite,
    rating,
    bedrooms,
    price,
    goods,
    host,
    title,
  } = room;

  const typeCapitalized = capitalize(type);
  const ratingPercent = calculateRatingPercent(rating);
  const { avatarUrl, isPro, name } = host;
  const nearbyOffers = offers.slice(0, MAXIMUM_NEARBY_OFFERS_COUNT);

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.map((imageUrl, i) => (
                <div className="property__image-wrapper" key={imageUrl + i.toString()}>
                  <img className="property__image" src={imageUrl} alt={typeCapitalized} />
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium &&
                <div className="property__mark">
                  <span>Premium</span>
                </div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button className={isFavorite
                  ? 'property__bookmark-button button property__bookmark-button--active'
                  : 'property__bookmark-button button'} type="button"
                >
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: ratingPercent}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {typeCapitalized}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max 4 adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((good, i) => (
                    <li className="property__inside-item" key={good + i.toString()}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {name}
                  </span>
                  {isPro &&
                    <span className="property__user-status">
                      Pro
                    </span>}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <ReviewsList reviews={reviews} />
            </div>
          </div>
          <section className="property__map map">
            <Map city={city} offers={[room, ...nearbyOffers]} selectedOffer={room}/>
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList
              className="near-places__list places__list"
              offers={nearbyOffers}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

Room.propTypes = {
  offers: PropTypes.arrayOf(offerProp).isRequired,
  reviews: PropTypes.arrayOf(reviewProp).isRequired,
};

export default Room;
