import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { connect } from 'react-redux';
import { fetchToken, setToken } from '../actions/token';
import { formatAddress, formatVolumeUsd, formatCount, formatPercent, formatAmountWithDecimals } from '../lib/formatter';
import LatestTrades from '../components/LatestTrades';
import Chart from '../components/Chart';

import './Token.scss';

const mapStateToProps = state => {
  return {
    token: state.token.token
  };
};

class Token extends React.Component<any, any> {
  // public componentDidMount() {
  //   const { dispatch, params } = this.props;
  //   dispatch(fetchToken({ address: params.address }));
  // }

  public componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(setToken({ token: {} }));
  }

  public render() {
    const { token, params } = this.props;
    if (!token.address) {
      return (
        <div className="Token">
          <Header />
        </div>
      );
    }

    return (
      <div className="Token">
        <Header />

        <div className="container">
          <div className="main-wrapper">
            <div className="main-header">
              <div className="main-title">{`TOKENS - ${token.name} (${token.symbol})`}</div>
            </div>
          </div>
          <div className="top-sections">
            <div className="token-info section-wrapper">
              <div className="item">
                <div className="item-label">Total Supply</div>
                <div className="item-content">{formatAmountWithDecimals(token.totalSupply, token.decimals)}</div>
              </div>
              <div className="item">
                <div className="item-label">Holders</div>
                <div className="item-content">{formatCount(token.holdersCount)}</div>
              </div>
              <div className="item">
                <div className="item-label">Contract Address</div>
                <div className="item-content">
                  <a className="link" href={`https://etherscan.io/address/${token.address}`} target="_blank">
                    {formatAddress(token.address)}
                  </a>
                </div>
              </div>
            </div>
            <div className="trades-info section-wrapper">
              <div className="item">
                <div className="item-label">24h Volume</div>
                <div className="item-content">{formatVolumeUsd(token.volume24h)}</div>
                <div className={'item-change-wrapper'}>
                  <div className={`change ${this.changeClass(token.volume24hChange)}`}>
                    {formatPercent(token.volume24hChange)}
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="item-label">24h Trades</div>
                <div className="item-content">{formatCount(token.trades24h)}</div>
                <div className={'item-change-wrapper'}>
                  <div className={`change ${this.changeClass(token.trades24hChange)}`}>
                    {formatPercent(token.trades24hChange)}
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="item-label">24h Traders</div>
                <div className="item-content">{formatCount(token.traders24h)}</div>
                <div className={'item-change-wrapper'}>
                  <div className={`change ${this.changeClass(token.traders24hChange)}`}>
                    {formatPercent(token.traders24hChange)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="chart-wrapper">
            <Chart tokenAddress={token.address} />
          </div>
          <div className="latest-trades-wrapper">
            <LatestTrades tokenAddress={token.address} />
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

export default connect(mapStateToProps)(Token);
