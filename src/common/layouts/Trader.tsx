import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { connect } from 'react-redux';
import { fetchTrader, setTrader } from '../actions/trade';
import {
  shortAddress,
  formatVolumeUsd,
  formatCount,
  formatPercent,
  formatAmountWithDecimals,
  formatPriceUsd
} from '../lib/formatter';
import LatestTrades from '../components/LatestTrades';
import Chart from '../components/Chart';
import Loading from '../components/Loading';
import { getTokenLogoUrl, changeColor } from '../lib/utils';
import './Trader.scss';
import { Link } from 'found';
import Tooltip from '@material-ui/core/Tooltip';

const mapStateToProps = state => {
  return {
    trader: state.trade.trader,
    traderLoading: state.trade.traderLoading
  };
};

class Trader extends React.Component<any, any> {
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
              <img src={require('../images/user.svg')} />
              <div className="main-title">{`Trader`}</div>
              <div className="secondary">{trader.address}</div>
            </div>
          </div>
          <div className="top-sections">
            <div className="left-info section-wrapper">
              {traderLoading ? (
                <Loading />
              ) : (
                <div>
                  <div className="info-title">
                    <div>Trader Profile</div>
                    <div className="info-link">
                      <a href={`https://etherscan.io/address/${trader.address}`} target="_blank">
                        <img src={require('../images/link.svg')} />
                      </a>
                    </div>
                  </div>
                  <div className="item">
                    <div className="item-label">24h Volume</div>
                    <div className="item-content">{formatVolumeUsd(trader.volume24h)}</div>
                    <div className={'item-change-wrapper'}>
                      <div className={`change ${changeColor(trader.volume24hChange)}`}>
                        {formatPercent(trader.volume24hChange)}
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="item-label">24h Trades</div>
                    <div className="item-content">{formatCount(trader.trades24h)}</div>
                    <div className={'item-change-wrapper'}>
                      <div className={`change ${changeColor(trader.trades24hChange)}`}>
                        {formatPercent(trader.trades24hChange)}
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="item-label">Total Maker Rebates</div>
                    <div className="item-content">{formatPriceUsd(trader.totalMakerRebate)}</div>
                    <div className="rebate-tooltip">
                      <Tooltip
                        title="Some relayers rebate up to 50% of all taker fees. Click for more details."
                        placement="top">
                        <i className="fa fa-question-circle" aria-hidden="true" />
                      </Tooltip>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="right-info section-wrapper">
              {traderLoading ? (
                <Loading />
              ) : (
                <div>
                  <div className="info-title">
                    <div>Top Tokens by 24h Vol</div>
                    <div className="info-link">
                      <Link className="link" to={`/tokens?traderAddress=${trader.address}`}>
                        <div className="view-more">VIEW MORE</div>
                      </Link>
                    </div>
                  </div>

                  {trader && trader.topTokens.length > 0 ? (
                    trader.topTokens.map(token => {
                      return (
                        <div className="item" key={token.address}>
                          <object data={getTokenLogoUrl(token.address)} type="image/png">
                            <div className="default-img" />
                          </object>
                          <div className="item-label">{token.name}</div>
                          <div className="item-content">{formatVolumeUsd(token.volume)}</div>
                          <div className={'item-change-wrapper'}>
                            <div className={`change ${changeColor(token.volumeChange)}`}>
                              {formatPercent(token.volumeChange)}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="no-recent">No trades in recent 24 hours.</div>
                  )}
                </div>
              )}
            </div>
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
}

export default connect(mapStateToProps)(Trader);
