import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchRelayers } from '../actions/relayer';
import { connect } from 'react-redux';
import './Relayers.scss';
import Loading from '../components/Loading';
import { Link } from 'found';
import { shortAddress } from '../lib/formatter';

const mapStateToProps = state => {
  return {
    relayers: state.relayer.relayers,
    relayersLoading: state.relayer.relayersLoading
  };
};

class Relayers extends React.Component<any, any> {
  public render() {
    const { relayers, relayersLoading } = this.props;
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
                      <td className="url">Link</td>
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
                                <img src={require(`../images/relayers/${relayer.slug}.png`)} />
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
