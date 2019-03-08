import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { connect } from 'react-redux';
import { fetchToken, setToken } from '../actions/token';
import { shortAddress, formatVolumeUsd, formatCount, formatPercent, formatAmountWithDecimals } from '../lib/formatter';
import LatestTrades from '../components/LatestTrades';
import Chart from '../components/Chart';
import { getTokenLogoUrl } from '../lib/tokenLogo';
import Loading from '../components/Loading';

import './Token.scss';

const mapStateToProps = state => {
  return {
    token: state.token.token,
    tokenLoading: state.token.tokenLoading
  };
};

class Token extends React.Component<any, any> {
  public componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(setToken({ token: {} }));
  }

  public render() {
    const { token, params, tokenLoading } = this.props;

    return (
      <div className="Token">
        <Header />

        <div className="container">
          <div className="main-wrapper">
            <div className="main-header">
              <object data={getTokenLogoUrl(params.address)} type="image/png">
                <div className="default-img" />
              </object>
              {!tokenLoading && <div className="main-title">{`TOKEN - ${token.name} (${token.symbol})`}</div>}
            </div>
          </div>
          <div className="top-sections">
            <div className="left-info section-wrapper">
              {tokenLoading ? (
                <Loading />
              ) : (
                <div>
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
                        {shortAddress(token.address)}
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="right-info section-wrapper">
              {tokenLoading ? (
                <Loading />
              ) : (
                <div>
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
              )}
            </div>
          </div>
          <div className="chart-wrapper">
            <Chart tokenAddress={params.address} />
          </div>
          <div className="latest-trades-wrapper">
            <LatestTrades tokenAddress={params.address} />
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
