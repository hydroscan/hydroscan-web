import React from 'react';
import { connect } from 'react-redux';
import './Chart.scss';
import { fetchTradesChart } from '../actions/trade';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';
import { formatVolumeUsdShort, formatCountShort } from '../lib/formatter';

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
      <div className="Chart section-wrapper">
        <ResponsiveContainer>
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 15,
              left: 15,
              bottom: 5
            }}>
            <XAxis
              dataKey="date"
              tickFormatter={tick => {
                return moment(tick).format('MMM Do');
              }}
            />
            <YAxis
              yAxisId="volume"
              tickFormatter={tick => {
                return formatVolumeUsdShort(tick);
              }}
            />
            <YAxis
              yAxisId="trades"
              tickFormatter={tick => {
                return formatCountShort(tick);
              }}
              orientation="right"
            />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="volume" yAxisId="volume" stroke="#8884d8" />
            <Line type="monotone" dataKey="trades" yAxisId="trades" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Chart);
