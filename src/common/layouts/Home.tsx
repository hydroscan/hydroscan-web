import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Indicators from '../components/Indicators';
import Chart from '../components/Chart';
import TopTokens from '../components/TopTokens';
import LatestTrades from '../components/LatestTrades';

import './Home.scss';

class Home extends React.Component {
  public render() {
    return (
      <div className="Home">
        <Header />
        <div className="container">
          <Indicators />
          <div className="chart-and-top-tokens">
            <div className="chart-wrapper">
              <Chart />
            </div>
            <div className="top-tokens-wrapper">
              <TopTokens />
            </div>
          </div>
          <div className="latest-trades-wrapper">
            <LatestTrades />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
