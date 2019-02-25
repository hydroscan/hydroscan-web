import React from 'react';
import { connect } from 'react-redux';
import './LatestTrades.scss';
import { fetchTradesLatest } from '../actions/trade';
import { formatAmount, formatPriceUsd, formatAddress } from '../lib/formatter';
import BigNumber from 'bignumber.js';
import moment from 'moment';

const mapStateToProps = state => {
  return {
    trades: state.trade.trades
  };
};

class LatestTrades extends React.PureComponent<any, any> {
  public componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchTradesLatest());
  }

  public render() {
    return (
      <div className="LatestTrades">
        <div className="section-header">
          <div className="section-title">LATEST TRADES</div>
          <div className="bottom-border" />
        </div>
        <div className="section-body">
          <table className="section-table">
            <thead>
              <tr>
                <td className="pair">Pair</td>
                <td className="trade-price">Trade Price</td>
                <td className="buyer">Buyer</td>
                <td className="buy-amount">Buy Amount</td>
                <td className="sell-amount">Sell Amount</td>
                <td className="seller">Seller</td>
                <td className="transaction">Trascation</td>
              </tr>
            </thead>
            <tbody>
              {this.props.trades.map(trade => {
                return (
                  <tr key={trade.ID}>
                    <td className="pair">
                      <div className="pair-main">{`${trade.baseToken.symbol}/${trade.quoteToken.symbol}`}</div>
                      <div className="pair-secondary">{moment(trade.date).fromNow()}</div>
                    </td>
                    <td className="trade-price">
                      <div className="trade-price-main">
                        {formatAmount(new BigNumber(trade.quoteTokenAmount).div(trade.baseTokenAmount).toFixed())}
                      </div>
                      <div className="trade-price-secondary">
                        {formatPriceUsd(
                          new BigNumber(trade.quoteTokenAmount)
                            .div(trade.baseTokenAmount)
                            .times(trade.quoteTokenPriceUSD)
                            .toFixed()
                        )}
                      </div>
                    </td>
                    <td className="buyer">{formatAddress(trade.makerAddress)}</td>
                    <td className="buy-amount">{formatAmount(trade.baseTokenAmount)}</td>
                    <td className="sell-amount">{formatAmount(trade.quoteTokenAmount)}</td>
                    <td className="seller">{formatAddress(trade.takerAddress)}</td>
                    <td className="transaction">{formatAddress(trade.transactionHash)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="view-more">VIEW MORE</div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(LatestTrades);
