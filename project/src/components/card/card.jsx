import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { OFFER_PATH, AppRoute } from '../../const';
import { offerProp } from '../../prop-types/props';
import { capitalize, calculateRatingPercent } from '../../util';
import { postFavorite } from '../../store/api-actions';

function Card({ offer, onMouseEnter, onMouseLeave }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { rating, previewImage, price, title, type, isPremium, isFavorite, id } = offer;
  const typeCapitalized = capitalize(type);
  const ratingPercent = calculateRatingPercent(rating);

  const changeFavoriteStatus = () => {
    dispatch(postFavorite(id, !isFavorite, () => history.push(AppRoute.LOGIN)));
  };

  return (
    <article
      className="cities__place-card place-card"
      onMouseEnter={() => onMouseEnter(id)}
      onMouseLeave={onMouseLeave}
    >
      {isPremium &&
      <div className="place-card__mark" data-testid="premium">
        <span>Premium</span>
      </div>}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={OFFER_PATH + id.toString()} data-testid="image-offer-link">
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place to rent" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={isFavorite
              ? 'place-card__bookmark-button button place-card__bookmark-button--active'
              : 'place-card__bookmark-button button'}
            type="button"
            data-testid="add-to-favorites"
            onClick={() => changeFavoriteStatus()}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: ratingPercent}} data-testid="rating"></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={OFFER_PATH + id.toString()} data-testid="title-offer-link">
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{typeCapitalized}</p>
      </div>
    </article>
  );
}

Card.propTypes = {
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  offer: offerProp,
};

Card.defaultProps = {
  onMouseEnter: () => {},
  onMouseLeave: () => {},
};

export default Card;
