import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postComment } from '../../store/api-actions';
import Alert from '../alert/alert';
import Star from '../star/star';
import { resetCommentError } from '../../store/action';
import { getRoomId, getSortedComments } from '../../store/app-data/selectors';
import { getCommentPostError } from '../../store/user/selectors';
import { Rating, MINIMUM_REVIEW_CHAR_COUNT } from '../../const';
import { isValidPost } from '../../util';

const initialState = {
  rating: 0,
  comment: '',
  isDisabled: false,
  isCheckedRadioInputs: new Array(Rating.MAXIMUM_RATING).fill(false),
};

function ReviewForm() {
  const id = useSelector(getRoomId);
  const reviews = useSelector(getSortedComments);
  const postError = useSelector(getCommentPostError);
  const dispatch = useDispatch();
  const { MAXIMUM_RATING } = Rating;

  const [rating, setRating] = useState(initialState.rating);
  const [comment, setComment] = useState(initialState.comment);
  const [isDisabled, setIsDisabled] = useState(initialState.isDisabled);
  const [isCheckedRadioInputs, setIsCheckedRadioInputs] = useState(initialState.isCheckedRadioInputs);
  const stars = new Array(MAXIMUM_RATING).fill(null);


  useEffect(() => {
    setIsCheckedRadioInputs(initialState.isCheckedRadioInputs);
    setRating(initialState.rating);
    setComment(initialState.comment);
    setIsDisabled(false);
  }, [reviews]);

  useEffect(() => {
    setIsDisabled(false);
  }, [postError]);

  const onSubmit = (commentPost, roomId) => {
    dispatch(postComment(commentPost, roomId));
    setIsDisabled(true);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit({
      rating,
      comment,
    }, id);
  };

  const onClick = () => {
    dispatch(resetCommentError());
  };

  return (
    <>
      {postError && <Alert errorText={postError} onClick={() => onClick()} />}
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
                onChange={(evt) => {
                  setRating(evt.target.value);
                  setIsCheckedRadioInputs(() => {
                    const newState = initialState.isCheckedRadioInputs.slice();
                    newState[MAXIMUM_RATING - Number(evt.target.value)] = true;
                    return newState;
                  });

                }}
                isDisabled={isDisabled}
                isChecked={isCheckedRadioInputs[i]}
              />
            );
          })}
        </div>
        <textarea
          value={comment}
          className="reviews__textarea form__textarea"
          id="review"
          name="review"
          placeholder="Tell how was your stay, what you like and what can be improved"
          data-testid="review-textarea"
          onChange={(evt) => setComment(evt.target.value)}
          disabled={isDisabled}
        />
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{MINIMUM_REVIEW_CHAR_COUNT} characters</b>.
          </p>
          <button
            className="reviews__submit form__submit button"
            type="submit"
            disabled={!isValidPost(rating, comment) || isDisabled}
            data-testid="review-submit-button"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}


export default ReviewForm;
