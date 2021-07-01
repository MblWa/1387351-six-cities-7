import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postComment } from '../../store/api-actions';
import Star from '../star/star';
import { getRoomId } from '../../store/app-data/selectors';
import { Rating } from '../../const';

function ReviewForm() {
  const id = useSelector(getRoomId);
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const commentRef = useRef();

  const { MAXIMUM_RATING } = Rating;
  const stars = new Array(MAXIMUM_RATING).fill(null);


  const onSubmit = (commentPost, roomId) => {
    dispatch(postComment(commentPost, roomId));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit({
      rating,
      comment: commentRef.current.value,
    }, id);
  };

  return (
    <form
      className="reviews__form form"
      onSubmit={handleSubmit}
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
              onChange={(evt) => setRating(evt.target.value)}
            />
          );
        })}
      </div>
      <textarea
        ref={commentRef}
        className="reviews__textarea form__textarea"
        id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
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
