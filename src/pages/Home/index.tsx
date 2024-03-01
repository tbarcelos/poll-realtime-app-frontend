import React from 'react';

import Header from '../../components/Header';
import PollList from '../../components/PollList';

const HomePage: React.FC = () => {
  return (
    <section>
      <Header />
      <PollList />
    </section>
  );
};

export default HomePage;
