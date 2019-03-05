import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { connect } from 'react-redux';
import { fetchTrader, setTrader } from '../actions/trade';
import { formatAddress, formatVolumeUsd, formatCount, formatPercent, formatAmountWithDecimals } from '../lib/formatter';
import LatestTrades from '../components/LatestTrades';
import Chart from '../components/Chart';
import Loading from '../components/Loading';

import './Trader.scss';

const mapStateToProps = state => {
  return {
    trader: state.trade.trader,
    traderLoading: state.trade.traderLoading
  };
};

class Trader extends React.Component<any, any> {
  // public componentDidMount() {
  //   const { dispatch, params } = this.props;
  //   dispatch(fetchTrader({ address: params.address }));
  // }

  public componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(setTrader({ trader: {} }));
  }

  public render() {
    const { trader, params, traderLoading } = this.props;

    return (
      <div className="Trader">
        <Header />

        <div className="container">
          <div className="main-wrapper">
            <div className="main-header">
              <div className="main-title">{`Traders - ${trader.address}`}</div>
            </div>
          </div>
          <div className="top-sections">
            <div className="left-info section-wrapper">{traderLoading ? <Loading /> : <div />}</div>
            <div className="right-info section-wrapper">{traderLoading ? <Loading /> : <div />}</div>
          </div>
          <div className="chart-wrapper">
            <Chart traderAddress={params.address} />
          </div>
          <div className="latest-trades-wrapper">
            <LatestTrades traderAddress={params.address} />
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  public changeClass(change) {
    if (change > 0) {
      return 'green';
    } else if (change < 0) {
      return 'red';
    } else {
      return 'gray';
    }
  }
}

export default connect(mapStateToProps)(Trader);
