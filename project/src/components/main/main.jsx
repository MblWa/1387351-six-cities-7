import React from 'react';
import Header from '../header/header';
import CitiesList from '../cities-list/cities-list';
import { useSelector } from 'react-redux';
import { getSortedOffers } from '../../store/app-data/selectors';

function Main() {
  const offers = useSelector(getSortedOffers);

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className={offers.length === 0 ? 'page__main page__main--index page__main--index-empty' : 'page__main page__main--index'}>
        <CitiesList />
      </main>
    </div>
  );
}

export default Main;
