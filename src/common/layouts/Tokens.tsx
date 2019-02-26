import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { formatAmount, formatPriceUsd, formatPercent, formatVolumeUsd } from '../lib/formatter';
import { fetchTokens } from '../actions/token';
import { connect } from 'react-redux';
import './Tokens.scss';
import 'rc-pagination/assets/index.css';
import Pagination from 'rc-pagination';
// import { Link } from 'found';

const mapStateToProps = state => {
  return {
    tokens: state.token.tokens,
    page: state.token.page,
    pageSize: state.token.pageSize,
    totalPage: state.token.totalPage,
    total: state.token.total
  };
};

class Tokens extends React.Component<any, any> {
  public componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchTokens({ page: 1 }));
  }

  public render() {
    const { tokens, page, pageSize, total } = this.props;
    return (
      <div className="Tokens">
        <Header />
        <div className="container">
          <div className="main-wrapper">
            <div className="main-header">
              <div className="main-title">TOKENS</div>
            </div>
            <div className="main-body">
              <table className="main-table">
                <thead>
                  <tr>
                    <td className="token">Token</td>
                    <td className="volume">Volume</td>
                    <td className="change">Vol Change</td>
                    <td className="traders">Traders</td>
                    <td className="price">Last Price (USD)</td>
                  </tr>
                </thead>
                <tbody>
                  {tokens.map(token => {
                    return (
                      <tr key={token.ID}>
                        <td className="token">
                          <div className="main">{token.name}</div>
                          <div className="secondary">{token.symbol}</div>
                        </td>
                        <td className="volume">
                          <div className="main">{formatVolumeUsd(token.volume24h)}</div>
                        </td>
                        <td className="change">
                          <div className="main">{formatPercent(token.volume24hChange)}</div>
                        </td>
                        <td className="traders">
                          <div className="main">{0}</div>
                        </td>
                        <td className="price">
                          <div className="main">{formatPriceUsd(token.priceUSD)}</div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="pagination-wrapper">
            <div className="showing-range">
              {`Showing ${(page - 1) * pageSize + 1}-${(page - 1) * pageSize + tokens.length} of ${formatAmount(
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
    dispatch(fetchTokens({ page: current }));
  }
}

export default connect(mapStateToProps)(Tokens);
