import React from 'react';
import PropTypes from 'prop-types';
import Review from '../review/review';
import ReviewForm from '../review-form/review-form';
import { reviewProp } from '../../prop-types/props';

function ReviewsList({ reviews }) {
  const reviewsCount = reviews.length;

  return (
    <section className="property__reviews reviews">
      {reviewsCount !== 0 &&
        <>
          <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewsCount}</span></h2>
          <ul className="reviews__list">
            {reviews.map((review) => <Review review={review} key={review.id}/>)}
          </ul>
        </>}
      <ReviewForm />
    </section>
  );
}

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(reviewProp).isRequired,
};

export default ReviewsList;
