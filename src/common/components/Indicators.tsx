import React from 'react';
import { connect } from 'react-redux';
import Indicator from './Indicator';
import './Indicators.scss';
import { fetchTradesIndicators } from '../actions/trade';

const mapStateToProps = state => {
  return {
    indicators: state.trade.indicators
  };
};

class Indicators extends React.PureComponent<any, any> {
  public componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchTradesIndicators());
  }

  public render() {
    return (
      <div className="Indicators">
        <div className="indicator-wrapper">
          <Indicator />
        </div>
        <div className="indicator-wrapper">
          <Indicator />
        </div>
        <div className="indicator-wrapper">
          <Indicator />
        </div>
        <div className="indicator-wrapper">
          <Indicator />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Indicators);
