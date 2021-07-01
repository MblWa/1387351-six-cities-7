import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../header/header';
import ReviewsList from '../reviews-list/reviews-list';
import OffersList from '../offers-list/offers-list';
import Map from '../map/map';
import LoadingScreen from '../loading-screen/loading-screen';
import { reviewProp, offerProp } from '../../prop-types/props';
import { capitalize, calculateRatingPercent } from '../../util';
import { fetchRoom, fetchOffersNearby, fetchComments } from '../../store/api-actions';
import { getOffersNearby, getRoom, getSortedComments, getRoomLoadedStatus } from '../../store/app-data/selectors';
import { MAXIMUM_NEARBY_OFFERS_COUNT, MAXIMUM_OFFER_IMAGES_COUNT } from '../../const';
import { AppRoute } from '../../const';

function Room({ room, onLoad, isRoomLoaded, offersNearby, comments }) {
  const { id } = useParams();
  const history = useHistory();
  const reviews = comments;

  useEffect(() => {
    onLoad(id, () => history.push(AppRoute.NOT_FOUND));
  }, [id, history, onLoad]);

  if (!isRoomLoaded || Number(id) !== room.id) {
    return (
      <LoadingScreen />
    );
  }

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
    maxAdults,
  } = room;

  const typeCapitalized = capitalize(type);
  const ratingPercent = calculateRatingPercent(rating);
  const { avatarUrl, isPro, name } = host;
  const nearbyOffers = offersNearby.slice(0, MAXIMUM_NEARBY_OFFERS_COUNT);


  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.slice(0, MAXIMUM_OFFER_IMAGES_COUNT).map((imageUrl, i) => (
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
                  Max {maxAdults} adults
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
  offersNearby: PropTypes.arrayOf(offerProp).isRequired,
  comments: PropTypes.arrayOf(reviewProp).isRequired,
  room: PropTypes.object,
  onLoad: PropTypes.func.isRequired,
  isRoomLoaded: PropTypes.bool.isRequired,
};

Room.defaultProps = {
  room: {},
};

const mapStateToProps = (state) => ({
  offersNearby: getOffersNearby(state),
  room: getRoom(state),
  comments: getSortedComments(state),
  isRoomLoaded: getRoomLoadedStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLoad(id, cb) {
    dispatch(fetchRoom(id, cb));
    dispatch(fetchOffersNearby(id));
    dispatch(fetchComments(id));
  },
});

export { Room };
export default connect(mapStateToProps, mapDispatchToProps)(Room);
