import React from 'react';

import logo from '../images/react.svg';
import FetchTradesButton from '../components/FetchTradesButton';

import './Home.scss';

class Home extends React.Component {
  public render() {
    return (
      <div className="Home">
        <div className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h2>Welcome to Hydroscan</h2>
        </div>
        <FetchTradesButton />
      </div>
    );
  }
}

export default Home;
