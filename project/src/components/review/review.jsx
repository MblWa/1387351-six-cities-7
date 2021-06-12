import React from 'react';
import reviewProp from '../../prop-types/review.prop';

function Review({ review }) {

  const { comment, date, rating, user } = review;
  const { avatarUrl, name } = user;

  const reviewRatingPercent = `${(rating * 20)}%`;
  const commentDate = new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: reviewRatingPercent}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={date}>{commentDate}</time>
      </div>
    </li>
  );
}

Review.propTypes = {
  review: reviewProp,
};

export default Review;
