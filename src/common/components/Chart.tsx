import React from 'react';
import { connect } from 'react-redux';
import './Chart.scss';
import { fetchTradesChart } from '../actions/trade';
import { fetchTokenChart } from '../actions/token';
import { ComposedChart, Area, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';
import { formatVolumeUsdShort, formatCountShort } from '../lib/formatter';
import FilterTabs from './FilterTabs';
import Loading from '../components/Loading';

const mapStateToProps = (state, props) => {
  return {
    chartData: props.tokenAddress ? state.token.chartData : state.trade.chartData,
    chartDataLoading: props.tokenAddress ? state.token.chartDataLoading : state.trade.chartDataLoading
  };
};

class Chart extends React.PureComponent<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      currentSection: 'VOLUME',
      sections: ['VOLUME', 'TRADES'],
      currentTab: '1M',
      tabs: ['24H', '7D', '1M', 'ALL']
    };
  }

  public render() {
    const { chartData, tokenAddress, dispatch, chartDataLoading } = this.props;
    const { currentTab, tabs, currentSection, sections } = this.state;
    if (chartData.length === 0) {
      return <div />;
    }

    const areaKey = currentSection === 'VOLUME' ? 'volume' : 'trades';
    return (
      <div className="Chart section-wrapper">
        <div className="chart-header">
          <div className="chart-title">
            {sections.map(section => {
              return (
                <div
                  key={section}
                  className={section === currentSection ? 'section-title' : 'section-title-inactive'}
                  onClick={() => {
                    this.setState({ currentSection: section });
                  }}>
                  {section}
                </div>
              );
            })}
          </div>

          <div className="filter-wrapper">
            <FilterTabs
              currentTab={currentTab}
              tabs={tabs}
              clickTab={tab => {
                this.setState({ currentTab: tab });
                if (tokenAddress) {
                  dispatch(fetchTokenChart({ address: tokenAddress, tab }));
                } else {
                  dispatch(fetchTradesChart({ tab }));
                }
              }}
            />
          </div>
          <div className="bottom-border" />
        </div>
        <div className="responsive-wrapper">
          {chartDataLoading && chartData.length !== 0 ? (
            <Loading />
          ) : (
            <ResponsiveContainer>
              <ComposedChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 0,
                  left: 0,
                  bottom: 5
                }}>
                <XAxis
                  dataKey="date"
                  tickFormatter={tick => {
                    return moment(tick).format('MMM Do');
                  }}
                />
                <YAxis
                  yAxisId={areaKey}
                  tickFormatter={tick => {
                    return currentSection === 'VOLUME' ? formatVolumeUsdShort(tick) : formatCountShort(tick);
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
                <Area type="monotone" dataKey={areaKey} yAxisId={areaKey} stroke="#00c6a3" fill="url(#LineGradient)" />
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Chart);
