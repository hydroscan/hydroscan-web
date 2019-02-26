import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { formatAmount, formatPriceUsd, formatAddress } from '../lib/formatter';
import { fetchTrades } from '../actions/trade';
import { connect } from 'react-redux';
import BigNumber from 'bignumber.js';
import moment from 'moment';
import './Trades.scss';
import 'rc-pagination/assets/index.css';
import Pagination from 'rc-pagination';
import { Link } from 'found';

const mapStateToProps = state => {
  return {
    trades: state.trade.trades,
    page: state.trade.page,
    pageSize: state.trade.pageSize,
    totalPage: state.trade.totalPage,
    total: state.trade.total
  };
};

class Trades extends React.Component<any, any> {
  public componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchTrades({ page: 1 }));
  }

  public render() {
    const { trades, page, pageSize, total } = this.props;
    return (
      <div className="Trades">
        <Header />
        <div className="container">
          <div className="main-wrapper">
            <div className="main-header">
              <div className="main-title">TRADES</div>
            </div>
            <div className="main-body">
              <table className="main-table">
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
                  {trades.map(trade => {
                    return (
                      <tr key={trade.ID}>
                        <td className="pair">
                          <Link to={`/trades/${trade.uuid}`}>
                            <div className="main">{`${trade.baseToken.symbol}/${trade.quoteToken.symbol}`}</div>
                          </Link>

                          <div className="secondary">{moment(trade.date).fromNow()}</div>
                        </td>

                        <td className="trade-price">
                          <div className="main">
                            {formatAmount(new BigNumber(trade.quoteTokenAmount).div(trade.baseTokenAmount).toFixed())}
                          </div>
                          <div className="secondary">
                            {formatPriceUsd(
                              new BigNumber(trade.quoteTokenAmount)
                                .div(trade.baseTokenAmount)
                                .times(trade.quoteTokenPriceUSD)
                                .toFixed()
                            )}
                          </div>
                        </td>
                        <td className="buyer">
                          <div className="main">{formatAddress(trade.makerAddress)}</div>
                          <div className="secondary">maker</div>
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
                          <div className="main">{formatAddress(trade.takerAddress)}</div>
                          <div className="secondary">taker</div>
                        </td>
                        <td className="transaction">{formatAddress(trade.transactionHash)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="pagination-wrapper">
            <div className="showing-range">
              {`Showing ${(page - 1) * pageSize + 1}-${(page - 1) * pageSize + trades.length} of ${formatAmount(
                total
              )}`}
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

  public handlePageChange(current, size) {
    const { dispatch } = this.props;
    dispatch(fetchTrades({ page: current }));
  }
}

export default connect(mapStateToProps)(Trades);
