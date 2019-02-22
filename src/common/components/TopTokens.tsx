import React from 'react';
import { connect } from 'react-redux';
import './TopTokens.scss';
import { fetchTokensTop } from '../actions/token';
import { formatVolumeUsd, formatPercent } from '../lib/formatter';

const mapStateToProps = state => {
  return {
    tokens: state.token.tokens
  };
};
class TopTokens extends React.PureComponent<any, any> {
  public componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchTokensTop());
  }
  public render() {
    return (
      <div className="TopTokens">
        <div className="section-header">
          <div className="section-title">TOP TOKENS</div>
          <div className="bottom-border" />
        </div>
        <div className="section-body">
          <table>
            <thead>
              <tr>
                <td>#</td>
                <td>Token</td>
                <td>Volume (USD)</td>
                <td>Vol Change</td>
              </tr>
            </thead>
            <tbody>
              {this.props.tokens.map((token, index) => {
                return (
                  <tr key={token.ID}>
                    <td>{index + 1}</td>
                    <td>{token.name}</td>
                    <td>{formatVolumeUsd(token.volume24h)}</td>
                    <td>{formatPercent(token.volume24hChange)}</td>
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

export default connect(mapStateToProps)(TopTokens);
