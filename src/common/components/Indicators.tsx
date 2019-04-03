import React from 'react';
import { connect } from 'react-redux';
import Indicator from './Indicator';
import './Indicators.scss';
import { fetchTradesIndicators } from '../actions/trade';
import { formatVolumeUsd, formatCount, formatAmount } from '../lib/formatter';
import moment from 'moment';

const mapStateToProps = state => {
  return {
    indicators: state.trade.indicators,
    indicatorsLoading: state.trade.indicatorsLoading
  };
};

class Indicators extends React.PureComponent<any, any> {
  public render() {
    const { indicators, indicatorsLoading } = this.props;
    return (
      <div className="Indicators">
        <div className="indicator-wrapper">
          <Indicator
            title="NETWORK VOLUME (24H)"
            data={formatVolumeUsd(indicators.volume24h)}
            indicatorsLoading={indicatorsLoading}
            dataMore={'Total Volume: ' + formatVolumeUsd(indicators.volume)}
            date={'Last Updated At: ' + moment(indicators.timestamp, 'X').format('MM/DD/YYYY, h:mm a')}
            showMore={true}
          />
        </div>
        <div className="indicator-wrapper">
          <Indicator
            title="TRADES (24H)"
            data={formatCount(indicators.trades24h)}
            indicatorsLoading={indicatorsLoading}
            dataMore={'Total Trades: ' + formatCount(indicators.trades)}
            date={'Last Updated At: ' + moment(indicators.timestamp, 'X').format('MM/DD/YYYY, h:mm a')}
            showMore={true}
          />
        </div>
        <div className="indicator-wrapper">
          <Indicator
            title="MAKER REBATES (24H)"
            data={formatAmount(indicators.marketRabate24h)}
            indicatorsLoading={indicatorsLoading}
            showMore={false}
          />
        </div>
        <div className="indicator-wrapper">
          <Indicator
            title="TRADERS (24H)"
            data={formatCount(indicators.traders24h)}
            indicatorsLoading={indicatorsLoading}
            dataMore={'Total Traders: ' + formatCount(indicators.traders)}
            date={'Last Updated At: ' + moment(indicators.timestamp, 'X').format('MM/DD/YYYY, h:mm a')}
            showMore={true}
          />
        </div>

        <div className="indicator-wrapper indicator-more">
          <Indicator
            title="NETWORK VOLUME (ALL)"
            data={formatVolumeUsd(indicators.volume)}
            indicatorsLoading={indicatorsLoading}
            showMore={false}
          />
        </div>
        <div className="indicator-wrapper indicator-more">
          <Indicator
            title="TRADES (ALL)"
            data={formatCount(indicators.trades)}
            indicatorsLoading={indicatorsLoading}
            showMore={false}
          />
        </div>
        <div className="indicator-wrapper indicator-more">
          <Indicator
            title="TRADERS (ALL)"
            data={formatCount(indicators.traders)}
            indicatorsLoading={indicatorsLoading}
            showMore={false}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Indicators);
