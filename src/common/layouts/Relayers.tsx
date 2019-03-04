import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchRelayers } from '../actions/relayer';
import { connect } from 'react-redux';

import './Relayers.scss';

const mapStateToProps = state => {
  return {
    relayers: state.relayer.relayers
  };
};

class Relayers extends React.Component<any, any> {
  // public componentDidMount() {
  //   const { dispatch } = this.props;
  //   dispatch(fetchRelayers());
  // }

  public render() {
    const { relayers } = this.props;
    return (
      <div className="Relayers">
        <Header />
        <div className="container">
          <div className="section-wrapper">
            <div className="section-header">
              <div className="section-title">LATEST TRADES</div>
              <div className="bottom-border" />
            </div>
            <div className="section-body">
              <table className="section-table">
                <thead>
                  <tr>
                    <td className="name">Name</td>
                    <td className="url">Link</td>
                    <td className="address">Relayer Address</td>
                  </tr>
                </thead>
                <tbody>
                  {relayers.map(relayer => {
                    return (
                      <tr key={relayer.ID}>
                        <td>{relayer.name}</td>
                        <td>{relayer.url}</td>
                        <td>{relayer.address}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Relayers);
