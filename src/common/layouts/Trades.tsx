import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { formatAmount, formatPriceUsd, shortAddress, formatCount } from '../lib/formatter';
import { fetchTrades } from '../actions/trade';
import { connect } from 'react-redux';
import BigNumber from 'bignumber.js';
import moment from 'moment';
import './Trades.scss';
import Pagination from 'rc-pagination';
import { Link } from 'found';
import Loading from '../components/Loading';

const mapStateToProps = state => {
  return {
    trades: state.trade.trades,
    page: state.trade.page,
    pageSize: state.trade.pageSize,
    total: state.trade.total,
    tradesLoading: state.trade.tradesLoading
  };
};

class Trades extends React.Component<any, any> {
  public render() {
    const { trades, page, pageSize, total, tradesLoading, location } = this.props;
    const { baseTokenAddress, quoteTokenAddress } = location.query;
    return (
      <div className="Trades">
        <Header />
        <div className="container">
          <div className="main-wrapper">
            <div className="main-header">
              <div className="main-title">
                {baseTokenAddress && quoteTokenAddress && trades[0]
                  ? `All Trades - ${trades[0].baseToken.symbol}/${trades[0].quoteToken.symbol}`
                  : 'All Trades'}
              </div>
            </div>
            <div className="main-body">
              {tradesLoading ? (
                <Loading />
              ) : (
                <table className="main-table">
                  <thead>
                    <tr>
                      <td className="pair">Pair</td>
                      <td className="trade-price">Trade Size</td>
                      <td className="buyer">Buyer</td>
                      <td className="buy-amount">Buy Amount</td>
                      <td className="sell-amount">Sell Amount</td>
                      <td className="seller">Seller</td>
                      <td className="transaction">Transaction</td>
                    </tr>
                  </thead>
                  <tbody>
                    {trades.map(trade => {
                      return (
                        <tr key={trade.uuid}>
                          <td className="pair">
                            <Link
                              className="link"
                              to={`/trades/?baseTokenAddress=${trade.baseToken.address}&quoteTokenAddress=${
                                trade.quoteToken.address
                              }`}>
                              <div className="main">{`${trade.baseToken.symbol}/${trade.quoteToken.symbol}`}</div>
                            </Link>

                            <div className="secondary">{moment(trade.date).fromNow()}</div>
                          </td>

                          <td className="trade-price">
                            <div className="main">{formatPriceUsd(trade.volumeUSD)}</div>
                          </td>
                          <td className="buyer">
                            <div className="main">
                              <Link className="link" to={`/traders/${trade.makerAddress}`}>
                                {shortAddress(trade.makerAddress)}
                              </Link>
                            </div>
                            <div className="secondary">Maker</div>
                          </td>
                          <td className="buy-amount">
                            <div className="main">{formatAmount(trade.baseTokenAmount)}</div>
                            <div className="secondary">{trade.baseToken.symbol}</div>
                          </td>
                          <td className="sell-amount">
                            <div className="main">{formatAmount(trade.quoteTokenAmount)}</div>
                            <div className="secondary">{trade.quoteToken.symbol}</div>
                          </td>
                          <td className="seller">
                            <div className="main">
                              <Link className="link" to={`/traders/${trade.takerAddress}`}>
                                {shortAddress(trade.takerAddress)}
                              </Link>
                            </div>
                            <div className="secondary">Taker</div>
                          </td>
                          <td className="transaction">
                            <Link className="link" to={`/trades/${trade.uuid}`}>
                              {shortAddress(trade.transactionHash)}
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          <div className="pagination-wrapper">
            <div className="showing-range">
              {`Showing ${(page - 1) * pageSize + 1}-${(page - 1) * pageSize + trades.length} of ${formatCount(total)}`}
            </div>
            <Pagination
              className="ant-pagination"
              defaultCurrent={page}
              pageSize={pageSize}
              total={total}
              onChange={this.handlePageChange.bind(this)}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  public handlePageChange(page, size) {
    const { dispatch, location } = this.props;
    const { baseTokenAddress, quoteTokenAddress } = location.query;
    dispatch(fetchTrades({ page, baseTokenAddress, quoteTokenAddress }));
  }
}

export default connect(mapStateToProps)(Trades);
