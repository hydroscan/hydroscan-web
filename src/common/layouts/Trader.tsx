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
import { getTokenLogoUrl, changeColor, getHotDiscount } from '../lib/utils';
import { getHotBalance } from '../lib/web3';
import './Trader.scss';
import { Link } from 'found';
import Tooltip from '@material-ui/core/Tooltip';
import BigNumber from 'bignumber.js';
import Modal from '@material-ui/core/Modal';

const modalStyle = {
  top: '50%',
  left: '50%',
  transform: `translate(-50%, -60%)`,
  position: 'absolute' as 'absolute',
  width: 635,
  height: 404,
  backgroundColor: '#fff',
  boxShadow: '0 1px 4px 1px rgba(0, 0, 0, 0.5)',
  padding: 0,
  outline: 'none',
  borderRadius: 5
};

const mapStateToProps = state => {
  return {
    trader: state.trade.trader,
    traderLoading: state.trade.traderLoading
  };
};

class Trader extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      hotBalance: new BigNumber(0),
      hotDiscount: 1,
      balanceFetched: false,
      modalIsOpen: false
    };
  }

  public async componentDidMount() {
    const { trader } = this.props;
    if (trader.address) {
      const hotBalance = await getHotBalance(trader.address);
      const hotDiscount = getHotDiscount(hotBalance);
      console.log(hotDiscount);
      this.setState({
        hotBalance,
        hotDiscount,
        balanceFetched: true
      });
    }
  }

  public async componentDidUpdate() {
    if (!this.state.balanceFetched) {
      const { trader } = this.props;
      const hotBalance = await getHotBalance(trader.address);
      const hotDiscount = getHotDiscount(hotBalance);
      console.log(hotDiscount);

      this.setState({
        hotBalance,
        hotDiscount,
        balanceFetched: true
      });
    }
  }

  public componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(setTrader({ trader: {} }));
  }

  public openModal() {
    this.setState({ modalIsOpen: true });
  }

  public closeModal() {
    this.setState({ modalIsOpen: false });
  }

  public render() {
    const { trader, params, traderLoading } = this.props;
    const { hotBalance, hotDiscount } = this.state;

    const rules = [
      {
        img: 'v5.svg',
        textOff: '50% OFF',
        textHot: 'Above 2,000,000 HOT '
      },
      {
        img: 'v4.svg',
        textOff: '40% OFF',
        textHot: '500,000 - 2,000,000 HOT'
      },
      {
        img: 'v3.svg',
        textOff: '30% OFF',
        textHot: '100,000 - 500,000 HOT'
      },
      {
        img: 'v2.svg',
        textOff: '20% OFF',
        textHot: '20,000 - 100,000 HOT'
      },
      {
        img: 'v1.svg',
        textOff: '10% OFF',
        textHot: '5,000 - 20,000 HOT'
      }
    ];

    let memberLogo = '';
    if (hotDiscount === 0.9) {
      memberLogo = 'v1.svg';
    } else if (hotDiscount === 0.8) {
      memberLogo = 'v2.svg';
    } else if (hotDiscount === 0.7) {
      memberLogo = 'v3.svg';
    } else if (hotDiscount === 0.6) {
      memberLogo = 'v4.svg';
    } else if (hotDiscount === 0.5) {
      memberLogo = 'v5.svg';
    }

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
                    <div className="item-label">
                      HOT Holder Status
                      <i className="fa fa-question-circle" aria-hidden="true" onClick={this.openModal.bind(this)} />
                    </div>
                    <div className="item-content">
                      {`${formatCount(hotBalance.toString())} HOT` +
                        (hotDiscount < 1 ? ` | ${formatPercent(1 - hotDiscount, false)} OFF Fees` : '')}
                    </div>
                    {hotDiscount < 1 ? (
                      <img
                        onClick={this.openModal.bind(this)}
                        className="member-logo"
                        src={require(`../images/${memberLogo}`)}
                      />
                    ) : null}
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
        <Modal open={this.state.modalIsOpen} onClose={this.closeModal.bind(this)}>
          <div style={modalStyle}>
            <div className="trader-modal-body">
              <div className="trader-title">HOT Token Holder Benefits</div>
              <div className="trader-content">
                If you are a Hydro Protocol Token (HOT) holder, you will automatically enjoy{' '}
                <span>trading fees discounts</span>
                collected by relayers. The table below provides an overview of the HOT holding amount and the
                corresponding fee discounts.
              </div>
              <div className="list">
                {rules.map(rule => {
                  return (
                    <div className="list-item" key={rule.img}>
                      <img src={require(`../images/${rule.img}`)} />
                      <div className="discount">{rule.textOff}</div>
                      <div className="hot-count">{rule.textHot}</div>
                    </div>
                  );
                })}
              </div>
              <div className="close-wrap">
                <div className="close" onClick={this.closeModal.bind(this)}>
                  Close
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Trader);
