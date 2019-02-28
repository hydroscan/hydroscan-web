import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { connect } from 'react-redux';
import { fetchTrade } from '../actions/trade';
import { formatAmount } from '../lib/formatter';

import './Trade.scss';

const mapStateToProps = state => {
  return {
    trade: state.trade.trade
  };
};

class Trade extends React.Component<any, any> {
  public componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch(fetchTrade({ uuid: params.uuid }));
  }

  public render() {
    const { trade } = this.props;
    if (!trade.uuid) {
      return '';
    }
    return (
      <div className="Trade">
        <Header />
        <div className="container">
          <div className="main-wrapper">
            <div className="main-header">
              <div className="main-title">TRADE DETAIL</div>
            </div>
            <div className="main-body">
              <div className="item">
                <div className="item-label">Transaction Hash</div>
                <div className="item-content">
                  <a className="link" href={`https://etherscan.io/tx/${trade.transactionHash}`} target="_blank">
                    {trade.transactionHash}
                  </a>
                </div>
              </div>
              <div className="item">
                <div className="item-label">Date</div>
                <div className="item-content">{trade.date}</div>
              </div>

              <div className="item" />

              <div className="item">
                <div className="item-label">Trade</div>
                <div className="item-content">
                  {`${trade.baseTokenAmount} ${trade.baseToken.symbol} ⇋ ${trade.quoteTokenAmount} ${
                    trade.quoteToken.symbol
                  }`}
                </div>
              </div>
              <div className="item">
                <div className="item-label">Trade Price</div>
                <div className="item-content">
                  {`${formatAmount(trade.baseTokenAmount / trade.quoteTokenAmount)} ${trade.baseToken.symbol} per ${
                    trade.quoteToken.symbol
                  }`}
                </div>
              </div>
              <div className="item">
                <div className="item-label">Relayer</div>
                <div className="item-content">
                  <a className="link" href={trade.relayer.url} target="_blank">
                    {trade.relayer.name}
                  </a>
                </div>
              </div>
              <div className="item">
                <div className="item-label">Maker</div>
                <div className="item-content">
                  <a className="link" href={`https://etherscan.io/address/${trade.makerAddress}`} target="_blank">
                    {trade.makerAddress}
                  </a>
                </div>
              </div>
              <div className="item">
                <div className="item-label">Taker</div>
                <div className="item-content">
                  <a className="link" href={`https://etherscan.io/address/${trade.takerAddress}`} target="_blank">
                    {trade.takerAddress}
                  </a>
                </div>
              </div>
              <div className="item">
                <div className="item-label">Taker Side</div>
                <div className="item-content">{'Buy'}</div>
              </div>

              <div className="item" />

              <div className="item">
                <div className="item-label">Maker Fee</div>
                <div className="item-content">{`${trade.makerFee} ${trade.quoteToken.symbol}`}</div>
              </div>
              <div className="item">
                <div className="item-label">Taker Fee</div>
                <div className="item-content">{`${trade.takerFee} ${trade.quoteToken.symbol}`}</div>
              </div>
              <div className="item">
                <div className="item-label">Maker Rebate</div>
                <div className="item-content">{trade.makerRebate}</div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Trade);
