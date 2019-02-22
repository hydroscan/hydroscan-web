import React from 'react';
import { connect } from 'react-redux';
import './LatestTrades.scss';
import { fetchTradesLatest } from '../actions/trade';

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
        <div className="section-header">LATEST TRADES</div>
        {this.props.trades.map(trade => {
          return <div>{trade.blockNumber}</div>;
        })}
      </div>
    );
  }
}

export default connect(mapStateToProps)(LatestTrades);
