import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { connect } from 'react-redux';
import Loading from '../components/Loading';

import './NoResult.scss';

const mapStateToProps = state => {
  return {};
};

class NoResult extends React.Component<any, any> {
  public render() {
    return (
      <div className="NoResult">
        <Header />
        <div className="container">
          <div className="main-wrapper">
            <div className="main-header">
              <div className="main-title" />
            </div>
            <div className="main-body">No Result</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps)(NoResult);
