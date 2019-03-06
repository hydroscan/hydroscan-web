import React from 'react';
import { connect } from 'react-redux';
import './TopTokens.scss';
import { fetchTokens } from '../actions/token';
import { formatVolumeUsd, formatPercent } from '../lib/formatter';
import FilterTabs from './FilterTabs';
import Loading from '../components/Loading';
import { Link } from 'found';

const mapStateToProps = state => {
  return {
    tokens: state.token.tokens,
    tokensLoading: state.token.tokensLoading
  };
};

class TopTokens extends React.PureComponent<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: '24H',
      tabs: ['24H', '7D', 'ALL']
    };
  }

  public render() {
    const { tabs, currentTab } = this.state;
    const { dispatch, tokens, tokensLoading } = this.props;
    const volumeKey = `volume${currentTab.charAt(0).toUpperCase() + currentTab.slice(1).toLowerCase()}`;
    const changeKey = volumeKey + 'Change';
    return (
      <div className="TopTokens section-wrapper">
        <div className="section-header">
          <div className="section-title">TOP TOKENS</div>
          <div className="filter-wrapper">
            <FilterTabs
              currentTab={currentTab}
              tabs={tabs}
              clickTab={tab => {
                this.setState({ currentTab: tab });
                dispatch(fetchTokens({ pageSize: 10, tab }));
              }}
            />
          </div>
          <div className="bottom-border" />
        </div>
        <div className="section-body">
          {tokensLoading ? (
            <Loading />
          ) : (
            <table className="section-table">
              <thead>
                <tr>
                  <td className="rank">#</td>
                  <td className="token">Token</td>
                  <td className="volume">Volume (USD)</td>
                  {currentTab !== 'ALL' && <td className="change">Vol Change</td>}
                </tr>
              </thead>
              <tbody>
                {tokens.map((token, index) => {
                  return (
                    <tr key={token.address}>
                      <td className="rank">{index + 1}</td>
                      <td className="token">
                        <Link className="link" to={`/tokens/${token.address}`}>
                          {token.name}
                        </Link>
                      </td>
                      <td className="volume">{formatVolumeUsd(token[volumeKey])}</td>
                      {currentTab !== 'ALL' && (
                        <td className={`change ${token[changeKey] >= 0 ? 'green' : 'red'}`}>
                          {formatPercent(token[changeKey])}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(TopTokens);
