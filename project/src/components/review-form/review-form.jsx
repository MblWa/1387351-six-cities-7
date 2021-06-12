import React, { useState } from 'react';
import { Rating } from '../../const';
import Star from '../star/star';

function ReviewForm() {
  const [review, setReview] = useState({
    rating: 0,
    reviewText: '',
  });

  const { reviewText } = review;
  const { MAXIMUM_RATING } = Rating;
  const stars = new Array(MAXIMUM_RATING).fill(null);

  return (
    <form
      className="reviews__form form"
      onSubmit={(evt) => {
        evt.preventDefault();
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {stars.map((_, i) => {
          const index = MAXIMUM_RATING - i;
          return (
            <Star
              key={Rating[index]}
              index={index}
              title={Rating[index]}
              onChange={({ target }) => {
                setReview({
                  ...review,
                  rating: target.value,
                });
              }}
            />
          );
        })}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={reviewText}
        onChange={({ target }) => {
          setReview({
            ...review,
            reviewText: target.value,
          });
        }}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
      </div>
    </form>
  );
}

export default ReviewForm;
