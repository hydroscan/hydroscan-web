import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchRelayers } from '../actions/relayer';
import { connect } from 'react-redux';
import './Relayers.scss';
import Loading from '../components/Loading';
import { Link } from 'found';
import { shortAddress, formatCount, formatVolumeUsd } from '../lib/formatter';

const mapStateToProps = state => {
  return {
    relayers: state.relayer.relayers,
    relayersLoading: state.relayer.relayersLoading
  };
};

class Relayers extends React.Component<any, any> {
  public render() {
    const { relayers, relayersLoading } = this.props;
    const relayerImgs = {};
    for (const relayer of relayers) {
      try {
        relayerImgs[relayer.address] = require(`../images/relayers/${relayer.slug}.png`);
      } catch (e) {
        relayerImgs[relayer.address] = '';
      }
    }
    return (
      <div className="Relayers">
        <Header />
        <div className="container">
          <div className="main-wrapper">
            <div className="main-header">
              <div className="main-title">Relayers</div>
            </div>
            <div className="main-body">
              {relayersLoading ? (
                <Loading />
              ) : (
                <table className="main-table">
                  <thead>
                    <tr>
                      <td className="name">Relayer</td>
                      <td className="url">Website</td>
                      <td className="trades">24h Trades</td>
                      <td className="volume">24h Volume (USD)</td>
                      <td className="address">Relayer Address</td>
                    </tr>
                  </thead>
                  <tbody>
                    {relayers.map(relayer => {
                      return (
                        <tr key={relayer.ID}>
                          <td>
                            <div className="relayer">
                              <Link className="link" to={`/relayers/${relayer.address}`}>
                                {relayerImgs[relayer.address] ? (
                                  <img src={relayerImgs[relayer.address]} />
                                ) : (
                                  <div className="default-img" />
                                )}
                              </Link>
                              <Link className="link" to={`/relayers/${relayer.address}`}>
                                {relayer.name}
                              </Link>
                            </div>
                          </td>
                          <td>
                            <a className="link" href={relayer.url} target="_blank">
                              {relayer.url}
                            </a>
                          </td>
                          <td className="trades">
                            <div className="main">{formatCount(relayer.trades24h)}</div>
                          </td>
                          <td className="volume">
                            <div className="main">{formatVolumeUsd(relayer.volume24h)}</div>
                          </td>

                          <td>
                            <Link className="link" to={`/relayers/${relayer.address}`}>
                              {shortAddress(relayer.address)}
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Relayers);
