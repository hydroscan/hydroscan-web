import React from 'react';
import { connect } from 'react-redux';
import './Chart.scss';
import { fetchTradesChart } from '../actions/trade';
import { ComposedChart, Area, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import moment from 'moment';
import { formatVolumeUsdShort, formatCountShort, formatVolumeUsd, formatCount, capitalize } from '../lib/formatter';
import FilterTabs from './FilterTabs';
import Loading from '../components/Loading';

const CustomTooltip = props => {
  const { active, payload, label } = props;
  if (active && payload) {
    return (
      <div className="custom-tooltip">
        {payload.reverse().map((entry, index) => (
          <div key={`item-${index}`} className="label">{`${capitalize(entry.dataKey)}: ${
            entry.dataKey.toLowerCase() === 'volume' ? formatVolumeUsd(entry.value) : formatCount(entry.value)
          }`}</div>
        ))}
        <div className="label-date">{moment(label).format('MMMM Do YYYY, h:mm:ss a')}</div>
      </div>
    );
  }

  return null;
};

const CustomLegend = props => {
  const { payload } = props;
  return (
    <div className="custom-legend">
      {payload.reverse().map((entry, index) => (
        <div key={`item-${index}`} className="item">
          <div className={entry.value.toLowerCase() === 'traders' ? 'bar' : 'line'} />
          <div>{entry.value}</div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    chartData: state.trade.chartData,
    chartDataLoading: state.trade.chartDataLoading
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
    const { chartData, tokenAddress, relayerAddress, traderAddress, dispatch, chartDataLoading } = this.props;
    const { currentTab, tabs, currentSection, sections } = this.state;
    const showTraders = !traderAddress;
    const areaKey = currentSection === 'VOLUME' ? 'volume' : 'trades';
    return (
      <div className="Chart section-wrapper">
        <div className="section-header">
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
                dispatch(fetchTradesChart({ tokenAddress, relayerAddress, traderAddress, tab }));
              }}
            />
          </div>
          <div className="bottom-border" />
        </div>
        <div className="responsive-wrapper">
          {chartDataLoading ? (
            <Loading />
          ) : (
            <ResponsiveContainer>
              <ComposedChart
                data={chartData}
                margin={{
                  top: 0,
                  right: 0,
                  left: -18,
                  bottom: 0
                }}>
                <XAxis
                  axisLine={false}
                  tickLine={false}
                  dataKey="date"
                  tickFormatter={tick => {
                    return currentTab === '24H' ? moment(tick).format('h a') : moment(tick).format('MMM Do');
                  }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  yAxisId={areaKey}
                  tickFormatter={tick => {
                    return currentSection === 'VOLUME' ? formatVolumeUsdShort(tick) : formatCountShort(tick);
                  }}
                />
                {showTraders && (
                  <YAxis
                    hide={true}
                    axisLine={false}
                    tickLine={false}
                    domain={['dataMin', dataMax => dataMax * 3]}
                    yAxisId="traders"
                    tickFormatter={tick => {
                      return formatCountShort(tick);
                    }}
                    orientation="right"
                  />
                )}
                {showTraders && (
                  <Bar
                    type="monotone"
                    dataKey="traders"
                    yAxisId="traders"
                    barSize={10}
                    stroke="#f1f3f4"
                    fill="#f1f3f4"
                    isAnimationActive={false}
                    name="Traders"
                  />
                )}
                <defs>
                  <linearGradient id="LineGradient" x1="0" y1="100%" x2="0" y2="0%">
                    <stop offset="0%" stopColor={'#00c6a3'} stopOpacity={0} />
                    <stop offset="50%" stopColor={'#00c6a3'} stopOpacity={0.5} />
                    <stop offset="100%" stopColor={'#00c6a3'} stopOpacity={0.6} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey={areaKey}
                  yAxisId={areaKey}
                  stroke="#00c6a3"
                  fill="url(#LineGradient)"
                  isAnimationActive={false}
                  name={areaKey && capitalize(areaKey)}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="top" content={<CustomLegend />} />
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Chart);
