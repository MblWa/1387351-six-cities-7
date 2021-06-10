import React from 'react';
import PropTypes from 'prop-types';
import { OFFER_PATH } from '../../const';
import { Link } from 'react-router-dom';
import offerProp from '../../prop-types/offer.prop';

function Card({ offer, onMouseOver }) {
  const { rating, previewImage, price, title, type, isPremium, isFavorite, id } = offer;
  const ratingPercent = `${(rating * 20)}%`;

  return (
    <article className="cities__place-card place-card" onMouseOver={() => onMouseOver(id)}>
      {isPremium &&
      <div className="place-card__mark">
        <span>Premium</span>
      </div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={OFFER_PATH + id.toString()}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place to rent" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={isFavorite
            ? 'place-card__bookmark-button button place-card__bookmark-button--active'
            : 'place-card__bookmark-button button'} type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: ratingPercent}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={OFFER_PATH + id.toString()}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

Card.propTypes = {
  onMouseOver: PropTypes.func.isRequired,
  offer: offerProp,
};

export default Card;
