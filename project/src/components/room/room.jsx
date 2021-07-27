import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../header/header';
import ReviewsList from '../reviews-list/reviews-list';
import OffersList from '../offers-list/offers-list';
import Map from '../map/map';
import LoadingScreen from '../loading-screen/loading-screen';
import { capitalize, calculateRatingPercent, selectPluralFormForNoun } from '../../util';
import { fetchRoom, fetchOffersNearby, fetchComments, postFavorite } from '../../store/api-actions';
import { getOffersNearby, getRoom, getSortedComments, getRoomLoadedStatus } from '../../store/app-data/selectors';
import { MAXIMUM_NEARBY_OFFERS_COUNT, MAXIMUM_OFFER_IMAGES_COUNT, AppRoute } from '../../const';

function Room() {
  const { id } = useParams();
  const history = useHistory();
  const offersNearby = useSelector(getOffersNearby);
  const room = useSelector(getRoom);
  const reviews = useSelector(getSortedComments);
  const isRoomLoaded = useSelector(getRoomLoadedStatus);
  const dispatch = useDispatch();
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

  useEffect(() => {
    const onLoad = (roomId, cb) => {
      dispatch(fetchRoom(roomId, cb));
      dispatch(fetchOffersNearby(roomId));
      dispatch(fetchComments(roomId));
    };

    onLoad(id, () => history.push(AppRoute.NOT_FOUND));
  }, [id, history, dispatch]);

  const changeFavoriteStatus = () => {
    dispatch(postFavorite(id, isFavorite, () => history.push(AppRoute.LOGIN)));
  };

  if (!isRoomLoaded || Number(id) !== room.id) {
    return (
      <LoadingScreen />
    );
  }

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
                  <img
                    className="property__image"
                    src={imageUrl}
                    alt={typeCapitalized}
                    data-testid="card-image"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium &&
                <div
                  className="property__mark"
                  data-testid="room-premium"
                >
                  <span>Premium</span>
                </div>}
              <div className="property__name-wrapper">
                <h1 className="property__name" data-testid="room-title">
                  {title}
                </h1>
                <button
                  className={isFavorite
                    ? 'property__bookmark-button button property__bookmark-button--active'
                    : 'property__bookmark-button button'}
                  type="button"
                  data-testid="bookmark-button"
                  onClick={() => changeFavoriteStatus()}
                >
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: ratingPercent}} data-testid="room-rating"></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li
                  className="property__feature property__feature--entire"
                  data-testid="room-type"
                >
                  {typeCapitalized}
                </li>
                <li
                  className="property__feature property__feature--bedrooms"
                  data-testid="room-beds"
                >
                  {bedrooms} {selectPluralFormForNoun(bedrooms, 'Bedroom', 'Bedrooms')}
                </li>
                <li
                  className="property__feature property__feature--adults"
                  data-testid="room-adults"
                >
                  Max {maxAdults} {selectPluralFormForNoun(maxAdults, 'adult', 'adults')}
                </li>
              </ul>
              <div className="property__price">
                <b
                  className="property__price-value"
                  data-testid="room-price"
                >
                  &euro;{price}
                </b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((good, i) => (
                    <li
                      className="property__inside-item"
                      key={good + i.toString()}
                      data-testid="room-feature"
                    >
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={isPro
                    ? 'property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper'
                    : 'property__avatar-wrapper user__avatar-wrapper'}
                  >
                    <img
                      className="property__avatar user__avatar"
                      src={avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                      data-testid="host-avatar"
                    />
                  </div>
                  <span className="property__user-name">
                    {name}
                  </span>
                  {isPro &&
                    <span className="property__user-status" data-testid="host-pro">
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
        {nearbyOffers.length !== 0 &&
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <OffersList
                className="near-places__list places__list"
                offers={nearbyOffers}
              />
            </section>
          </div>}
      </main>
    </div>
  );
}

export default Room;
