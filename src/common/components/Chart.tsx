import React from 'react';
import { connect } from 'react-redux';
import './Chart.scss';
import { fetchTradesChart } from '../actions/trade';

const mapStateToProps = state => {
  return {
    chartData: state.trade.chartData
  };
};

class Chart extends React.PureComponent<any, any> {
  public componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchTradesChart());
  }

  public render() {
    return <div className="Chart">Hydroscan Chart</div>;
  }
}

export default connect(mapStateToProps)(Chart);
