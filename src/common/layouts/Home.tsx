import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Indicators from '../components/Indicators';
import Chart from '../components/Chart';
import TopTokens from '../components/TopTokens';
import LatestTrades from '../components/LatestTrades';
import { Helmet } from 'react-helmet';

import './Home.scss';
import 'rc-pagination/assets/index.css';

class Home extends React.Component {
  public render() {
    return (
      <div className="Home">
        <Helmet>
          <title>Hydroscan</title>
          <meta name="description" content="Hydroscan description" />
          <meta name="keywords" content="Hydroscan,keywords" />
        </Helmet>

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
