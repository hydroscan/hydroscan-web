import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { formatAmount, formatPriceUsd, shortAddress, formatCount, formatVolumeUsd } from '../lib/formatter';
import { fetchTrades, resetTradesPage } from '../actions/trade';
import { connect } from 'react-redux';
import BigNumber from 'bignumber.js';
import moment from 'moment';
import './Trades.scss';
import Pagination from 'rc-pagination';
import { Link } from 'found';
import Loading from '../components/Loading';
import { getTradeWithSide } from '../lib/utils';
import Modal from '@material-ui/core/Modal';
import { CSVLink } from 'react-csv';
import fetch from 'isomorphic-fetch';
import { HYDROSCAN_API_URL } from '../lib/config';

const mapStateToProps = (state, props) => {
  return {
    trades: state.trade.trades,
    page: state.trade.page,
    pageSize: state.trade.pageSize,
    total: state.trade.total,
    tradesLoading: state.trade.tradesLoading
  };
};

const modalStyle = {
  top: '50%',
  left: '50%',
  transform: `translate(-50%, -60%)`,
  position: 'absolute' as 'absolute',
  width: 600,
  height: 200,
  backgroundColor: '#fff',
  boxShadow: '0 1px 4px 1px rgba(0, 0, 0, 0.5)',
  padding: 15,
  outline: 'none',
  borderRadius: 5
};

class Trades extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      downloadModalIsOpen: false,
      csvData: []
    };
  }

  public openDownloadModal() {
    this.setState({ downloadModalIsOpen: true });
    fetch(`${HYDROSCAN_API_URL}/api/v1/trades?filter=ALL&page=1&pageSize=1000`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const trades = data.trades.map(trade => {
          return {
            date: trade.date,
            pair: `${trade.baseToken.symbol}/${trade.quoteToken.symbol}`,
            baseTokenAmount: trade.baseTokenAmount,
            quoteTokenAmount: trade.quoteTokenAmount,
            quoteTokenPriceUSD: trade.quoteTokenPriceUSD,
            baseTokenAddress: trade.baseTokenAddress,
            quoteTokenAddress: trade.quoteTokenAddress,
            transactionHash: trade.transactionHash,
            makerAddress: trade.makerAddress,
            takerAddress: trade.takerAddress,
            buyerAddress: trade.buyerAddress,
            makerFee: trade.makerFee,
            takerFee: trade.takerFee,
            makerRebate: trade.makerRebate
          };
        });
        this.setState({ csvData: trades });
      });
  }

  public closeDownloadModal() {
    this.setState({ downloadModalIsOpen: false });
  }

  public componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(resetTradesPage());
  }

  public render() {
    const { trades, page, pageSize, total, tradesLoading, location, dispatch, router } = this.props;
    const { baseTokenAddress, quoteTokenAddress } = location.query;
    const isPair = baseTokenAddress && quoteTokenAddress;
    return (
      <div className="Trades">
        <Header />
        <div className="container">
          <div className="main-wrapper">
            <div className="main-header">
              <div className="main-title">
                {isPair && trades[0]
                  ? `All Trades - ${trades[0].baseToken.symbol}/${trades[0].quoteToken.symbol}`
                  : 'All Trades'}
              </div>
              <div className="pagination-wrapper-top">
                <Pagination
                  className="ant-pagination"
                  defaultCurrent={1}
                  current={page}
                  pageSize={pageSize}
                  total={total}
                  onChange={this.handlePageChange.bind(this)}
                />
              </div>
            </div>
            <div className={`main-body ${trades.length === pageSize ? 'full-page' : ''}`}>
              {tradesLoading ? (
                <Loading />
              ) : (
                <table className="main-table">
                  <thead>
                    <tr>
                      <td className="pair">Pair</td>
                      {isPair && <td className="trade-price">Trade Price</td>}
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
                        <tr key={trade.uuid}>
                          <td className="pair">
                            <Link
                              className="link"
                              to={`/trades/?baseTokenAddress=${trade.baseToken.address}&quoteTokenAddress=${
                                trade.quoteToken.address
                              }`}
                              onClick={() => {
                                dispatch(resetTradesPage());
                              }}>
                              <div className="main">{`${trade.baseToken.symbol}/${trade.quoteToken.symbol}`}</div>
                            </Link>

                            <div className="secondary">{moment(trade.date).fromNow()}</div>
                          </td>

                          {isPair && (
                            <td className="trade-price">
                              <div>
                                <div className="trade-price-main">
                                  {formatAmount(
                                    new BigNumber(trade.quoteTokenAmount).div(trade.baseTokenAmount).toFixed()
                                  )}
                                </div>
                                <div className="secondary">
                                  {formatPriceUsd(
                                    new BigNumber(trade.quoteTokenAmount)
                                      .div(trade.baseTokenAmount)
                                      .times(trade.quoteTokenPriceUSD)
                                      .toFixed()
                                  )}
                                </div>
                              </div>
                            </td>
                          )}
                          <td className="trade-price">
                            <div className="main">{formatVolumeUsd(trade.volumeUSD)}</div>
                          </td>
                          <td className="buyer">
                            <div className="main">
                              <Link className="link" to={`/traders/${trade.buyerAddress}`}>
                                {shortAddress(trade.buyerAddress)}
                              </Link>
                            </div>
                            <div className="secondary">{trade.buyerIs}</div>
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
                              <Link className="link" to={`/traders/${trade.sellerAddress}`}>
                                {shortAddress(trade.sellerAddress)}
                              </Link>
                            </div>
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
          </div>
          <div className="download-btn" onClick={this.openDownloadModal.bind(this)}>
            Download CSV
          </div>
          <div className="pagination-wrapper">
            <div className="showing-range">
              {`Showing ${(page - 1) * pageSize + 1}-${(page - 1) * pageSize + trades.length} of ${formatCount(total)}`}
            </div>
            <Pagination
              className="ant-pagination"
              defaultCurrent={1}
              current={page}
              pageSize={pageSize}
              total={total}
              onChange={this.handlePageChange.bind(this)}
            />
          </div>
        </div>
        <Footer />
        <Modal open={this.state.downloadModalIsOpen} onClose={this.closeDownloadModal.bind(this)}>
          <div style={modalStyle}>
            <div className="download-modal-body">
              <div className="download-title">Download Data</div>
              <div className="download-content">You are about to export the last 1,000 records as CSV. </div>
              <div className="download-wrap">
                <CSVLink filename={'hydro-trades.csv'} data={this.state.csvData} className="download">
                  Download
                </CSVLink>
              </div>
            </div>
          </div>
        </Modal>
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
