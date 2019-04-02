import React from 'react';
import { connect } from 'react-redux';
import './LatestTrades.scss';
import { fetchTrades, resetTradesPage } from '../actions/trade';
import { formatAmount, formatPriceUsd, shortAddress, formatCount, formatVolumeUsd } from '../lib/formatter';
import BigNumber from 'bignumber.js';
import moment from 'moment';
import { Link } from 'found';
import Pagination from 'rc-pagination';
import en_US from 'rc-pagination/lib/locale/en_US';
import Loading from '../components/Loading';
import { getTradeWithSide } from '../lib/utils';

const mapStateToProps = (state, props) => {
  return {
    trades: state.trade.trades,
    page: state.trade.page,
    pageSize: state.trade.pageSize,
    total: state.trade.total,
    tradesLoading: state.trade.tradesLoading
  };
};

class LatestTrades extends React.PureComponent<any, any> {
  public componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(resetTradesPage());
  }

  public render() {
    const { trades, page, pageSize, total, tokenAddress, relayerAddress, traderAddress, tradesLoading } = this.props;
    const hasFilter = tokenAddress || relayerAddress || traderAddress;
    return (
      <div className="LatestTrades section-wrapper">
        <div className="section-header">
          <div className="section-title">LATEST TRADES</div>
          <div className="bottom-border" />
        </div>
        <div className={`section-body ${hasFilter && trades.length === pageSize ? 'full-page' : ''}`}>
          {tradesLoading ? (
            <Loading />
          ) : (
            <table className="section-table">
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
                {trades.map(t => {
                  const trade = getTradeWithSide(t);
                  return (
                    <tr key={trade.ID}>
                      <td className="pair">
                        <div className="pair-main">
                          <Link
                            className="link"
                            to={`/trades/?baseTokenAddress=${trade.baseToken.address}&quoteTokenAddress=${
                              trade.quoteToken.address
                            }`}>
                            {`${trade.baseToken.symbol}/${trade.quoteToken.symbol}`}
                          </Link>
                        </div>
                        <div className="secondary">{moment(trade.date).fromNow()}</div>
                      </td>
                      <td className="trade-price">
                        <div className="main">{formatVolumeUsd(trade.volumeUSD)}</div>
                      </td>
                      <td className="buyer">
                        <Link className="link" to={`/traders/${trade.buyerAddress}`}>
                          {shortAddress(trade.buyerAddress)}
                        </Link>
                        <div className="secondary">{trade.buyerIs}</div>
                      </td>
                      <td className="buy-amount">
                        {formatAmount(trade.baseTokenAmount)}
                        <div className="secondary">{trade.baseToken.symbol}</div>
                      </td>
                      <td className="sell-amount">
                        {formatAmount(trade.quoteTokenAmount)}
                        <div className="secondary">{trade.quoteToken.symbol}</div>
                      </td>
                      <td className="seller">
                        <Link className="link" to={`/traders/${trade.sellerAddress}`}>
                          {shortAddress(trade.sellerAddress)}
                        </Link>
                        <div className="secondary">{trade.sellerIs}</div>
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
        {hasFilter ? (
          <div className="page-wrapper pagination-wrapper">
            <div className="showing-range">
              {`Showing ${(page - 1) * pageSize + 1}-${(page - 1) * pageSize + trades.length} of ${formatCount(total)}`}
            </div>
            <Pagination
              className="ant-pagination"
              locale={en_US}
              defaultCurrent={1}
              current={page}
              pageSize={pageSize}
              total={total}
              onChange={this.handlePageChange.bind(this)}
            />
          </div>
        ) : (
          <div className="view-more-wrapper">
            <Link className="link" to="/trades">
              <div className="view-more">VIEW MORE</div>
            </Link>
          </div>
        )}
      </div>
    );
  }

  public handlePageChange(page, size) {
    const { dispatch, tokenAddress, relayerAddress, traderAddress } = this.props;
    dispatch(fetchTrades({ page, tokenAddress, relayerAddress, traderAddress }));
  }
}

export default connect(mapStateToProps)(LatestTrades);
