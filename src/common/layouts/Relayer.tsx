import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { connect } from 'react-redux';
import { fetchRelayer, setRelayer } from '../actions/relayer';
import { formatAddress, formatVolumeUsd, formatCount, formatPercent, formatAmountWithDecimals } from '../lib/formatter';
import LatestTrades from '../components/LatestTrades';
import Chart from '../components/Chart';
import Loading from '../components/Loading';

import './Relayer.scss';

const mapStateToProps = state => {
  return {
    relayer: state.relayer.relayer,
    relayerLoading: state.relayer.relayerLoading
  };
};

class Relayer extends React.Component<any, any> {
  // public componentDidMount() {
  //   const { dispatch, params } = this.props;
  //   dispatch(fetchRelayer({ address: params.address }));
  // }

  public componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(setRelayer({ relayer: {} }));
  }

  public render() {
    const { relayer, params, relayerLoading } = this.props;

    return (
      <div className="Relayer">
        <Header />

        <div className="container">
          <div className="main-wrapper">
            <div className="main-header">
              <div className="main-title">{`Relayers - ${relayer.name} (${relayer.address})`}</div>
            </div>
          </div>
          <div className="top-sections">
            <div className="left-info section-wrapper">{relayerLoading ? <Loading /> : <div />}</div>
            <div className="right-info section-wrapper">{relayerLoading ? <Loading /> : <div />}</div>
          </div>
          <div className="chart-wrapper">
            <Chart relayerAddress={params.address} />
          </div>
          <div className="latest-trades-wrapper">
            <LatestTrades relayerAddress={params.address} />
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  public changeClass(change) {
    if (change > 0) {
      return 'green';
    } else if (change < 0) {
      return 'red';
    } else {
      return 'gray';
    }
  }
}

export default connect(mapStateToProps)(Relayer);
