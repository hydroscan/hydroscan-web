import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { connect } from 'react-redux';
import { fetchRelayer, setRelayer } from '../actions/relayer';
import { shortAddress, formatVolumeUsd, formatCount, formatPercent, formatAmountWithDecimals } from '../lib/formatter';
import LatestTrades from '../components/LatestTrades';
import Chart from '../components/Chart';
import Loading from '../components/Loading';
import { getTokenLogoUrl } from '../lib/tokenLogo';
import './Relayer.scss';
import { Link } from 'found';

const mapStateToProps = state => {
  return {
    relayer: state.relayer.relayer,
    relayerLoading: state.relayer.relayerLoading
  };
};

class Relayer extends React.Component<any, any> {
  public componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(setRelayer({ relayer: {} }));
  }

  public render() {
    const { relayer, params, relayerLoading } = this.props;
    return (
      <div className="Relayer">
        <Header />

        <div className="container">
          <div className="main-wrapper">
            <div className="main-header">
              {!relayerLoading && <img src={require(`../images/relayers/${relayer.slug}.png`)} />}
              <div className="main-title">{relayer.name}</div>
              <div className="secondary">{relayer.address}</div>
            </div>
          </div>
          <div className="top-sections">
            <div className="left-info section-wrapper">
              {relayerLoading ? (
                <Loading />
              ) : (
                <div>
                  <div className="info-title">
                    <div>Relayer Profile</div>
                    <div className="info-link">
                      <a href={`https://etherscan.io/address/${relayer.address}`} target="_blank">
                        <img src={require('../images/link.svg')} />
                      </a>
                    </div>
                  </div>
                  <div className="item">
                    <div className="item-label">24h Volume</div>
                    <div className="item-content">{formatVolumeUsd(relayer.volume24h)}</div>
                    <div className={'item-change-wrapper'}>
                      <div className={`change ${this.changeClass(relayer.volume24hChange)}`}>
                        {formatPercent(relayer.volume24hChange)}
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="item-label">24h Trades</div>
                    <div className="item-content">{formatCount(relayer.trades24h)}</div>
                    <div className={'item-change-wrapper'}>
                      <div className={`change ${this.changeClass(relayer.trades24hChange)}`}>
                        {formatPercent(relayer.trades24hChange)}
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="item-label">24h Traders</div>
                    <div className="item-content">{formatCount(relayer.traders24h)}</div>
                    <div className={'item-change-wrapper'}>
                      <div className={`change ${this.changeClass(relayer.traders24hChange)}`}>
                        {formatPercent(relayer.traders24hChange)}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="right-info section-wrapper">
              {relayerLoading ? (
                <Loading />
              ) : (
                <div>
                  <div className="info-title">
                    <div>Top Tokens by 24h Vol</div>
                    <div className="info-link">
                      <Link className="link" to={`/tokens?relayerAddress=${relayer.address}`}>
                        <div className="view-more">VIEW MORE</div>
                      </Link>
                    </div>
                  </div>

                  {relayer &&
                    relayer.topTokens.map(token => {
                      return (
                        <div className="item" key={token.address}>
                          <object data={getTokenLogoUrl(token.address)} type="image/png">
                            <div className="default-img" />
                          </object>
                          <div className="item-label">{token.name}</div>
                          <div className="item-content">{formatVolumeUsd(token.volume)}</div>
                          <div className={'item-change-wrapper'}>
                            <div className={`change ${this.changeClass(token.volumeChange)}`}>
                              {formatPercent(token.volumeChange)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
          <div className="chart-wrapper">
            <Chart relayerAddress={params.address} />
          </div>
          <div className="latest-trades-wrapper">
            <LatestTrades relayerAddress={params.address} />
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

export default connect(mapStateToProps)(Relayer);
