import React from 'react';
import { connect } from 'react-redux';
import './TopTokens.scss';
import { fetchTokensTop } from '../actions/token';
import { formatVolumeUsd, formatPercent } from '../lib/formatter';
import FilterTabs from './FilterTabs';

const mapStateToProps = state => {
  return {
    tokens: state.token.tokens
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

  public componentDidMount() {
    const { currentTab } = this.state;
    const { dispatch } = this.props;
    dispatch(fetchTokensTop(currentTab));
  }

  public render() {
    const { tabs, currentTab } = this.state;
    const { dispatch } = this.props;
    const volumeKey = `volume${currentTab.charAt(0).toUpperCase() + currentTab.slice(1).toLowerCase()}`;
    const changeKey = volumeKey + 'Change';
    return (
      <div className="TopTokens">
        <div className="section-header">
          <div className="section-title">TOP TOKENS</div>
          <div className="filter-wrapper">
            <FilterTabs
              currentTab={currentTab}
              tabs={tabs}
              clickTab={tab => {
                this.setState({ currentTab: tab });
                dispatch(fetchTokensTop(tab));
              }}
            />
          </div>
          <div className="bottom-border" />
        </div>
        <div className="section-body">
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
              {this.props.tokens.map((token, index) => {
                return (
                  <tr key={token.ID}>
                    <td className="rank">{index + 1}</td>
                    <td className="token">{token.name}</td>
                    <td className="volume">{formatVolumeUsd(token[volumeKey])}</td>
                    {currentTab !== 'ALL' && (
                      <td className={`change ${token.volume24hChange >= 0 ? 'green' : 'red'}`}>
                        {formatPercent(token[changeKey])}
                      </td>
                    )}
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
