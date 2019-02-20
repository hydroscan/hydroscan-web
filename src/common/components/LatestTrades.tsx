import React from 'react';
import { connect } from 'react-redux';
import './LatestTrades.scss';

const mapStateToProps = state => {
  return {};
};

class LatestTrades extends React.PureComponent<any, any> {
  public render() {
    return <div className="LatestTrades">Hydroscan LatestTrades</div>;
  }
}

export default connect(mapStateToProps)(LatestTrades);
