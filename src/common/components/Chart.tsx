import React from 'react';
import { connect } from 'react-redux';
import './Chart.scss';
import { fetchTradesChart } from '../actions/trade';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import { formatVolumeUsd } from '../lib/formatter';

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
    const { chartData } = this.props;
    if (chartData.length === 0) {
      return <div />;
    }

    return (
      <div className="Chart">
        <LineChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="volume" />
          <YAxis yAxisId="trades" orientation="right" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="volume" yAxisId="volume" stroke="#8884d8" />
          <Line type="monotone" dataKey="trades" yAxisId="trades" stroke="#82ca9d" />
        </LineChart>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Chart);
