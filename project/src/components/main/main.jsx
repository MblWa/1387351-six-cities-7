import React from 'react';
import Header from '../header/header';
import CitiesList from '../cities-list/cities-list';

function Main() {
  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <CitiesList />
      </main>
    </div>
  );
}

export default Main;
