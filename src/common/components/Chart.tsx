import React from 'react';
import { connect } from 'react-redux';
import './Chart.scss';
import { fetchTradesChart } from '../actions/trade';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const testData = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

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
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="volume" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="trades" stroke="#82ca9d" />
        </LineChart>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Chart);
