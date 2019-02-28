import React from 'react';
import { connect } from 'react-redux';
import './Chart.scss';
import { fetchTradesChart } from '../actions/trade';
import { fetchTokenChart } from '../actions/token';
import { ComposedChart, Area, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';
import { formatVolumeUsdShort, formatCountShort } from '../lib/formatter';

const mapStateToProps = (state, props) => {
  return {
    chartData: props.tokenAddress ? state.token.chartData : state.trade.chartData
  };
};

class Chart extends React.PureComponent<any, any> {
  public componentDidMount() {
    const { dispatch, tokenAddress } = this.props;
    if (tokenAddress) {
      dispatch(fetchTokenChart({ address: tokenAddress }));
    } else {
      dispatch(fetchTradesChart());
    }
  }

  public render() {
    const { chartData } = this.props;
    if (chartData.length === 0) {
      return <div />;
    }

    return (
      <div className="Chart section-wrapper">
        <ResponsiveContainer>
          <ComposedChart
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
              height={50}
              yAxisId="traders"
              tickFormatter={tick => {
                return formatCountShort(tick);
              }}
              orientation="right"
            />
            <Tooltip />
            <Legend />
            <Bar type="monotone" dataKey="traders" yAxisId="traders" barSize={10} stroke="#f1f3f4" fill="#f1f3f4" />
            <defs>
              <linearGradient id="LineGradient" x1="0" y1="100%" x2="0" y2="0%">
                <stop offset="0%" stopColor={'#00c6a3'} stopOpacity={0} />
                <stop offset="50%" stopColor={'#00c6a3'} stopOpacity={0.5} />
                <stop offset="100%" stopColor={'#00c6a3'} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="volume" yAxisId="volume" stroke="#00c6a3" fill="url(#LineGradient)" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Chart);
