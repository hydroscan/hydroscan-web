import React from 'react';
import { connect } from 'react-redux';
import './LatestTrades.scss';
import { fetchTradesLatest } from '../actions/trade';
import { formatAmount, formatPriceUsd, formatAddress } from '../lib/formatter';

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
          <table>
            <thead>
              <tr>
                <td>Pair</td>
                <td>Trade Price</td>
                <td>Buyer</td>
                <td>Buy Amount</td>
                <td>Sell Amount</td>
                <td>Seller</td>
                <td>Trascation</td>
              </tr>
            </thead>
            <tbody>
              {this.props.trades.map(trade => {
                return (
                  <tr key={trade.ID}>
                    <td>{`${trade.baseToken.symbol}/${trade.quoteToken.symbol}`}</td>
                    <td>{formatPriceUsd(trade.quoteTokenPriceUSD)}</td>
                    <td>{formatAddress(trade.makerAddress)}</td>
                    <td>{formatAmount(trade.baseTokenAmount)}</td>
                    <td>{formatAmount(trade.quoteTokenAmount)}</td>
                    <td>{formatAddress(trade.takerAddress)}</td>
                    <td>{formatAddress(trade.transactionHash)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(LatestTrades);
