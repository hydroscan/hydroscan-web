import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { connect } from 'react-redux';
import { fetchToken, fetchTokenChart } from '../actions/token';
// import { formatAmount } from '../lib/formatter';

import './Token.scss';

const mapStateToProps = state => {
  return {
    token: state.token.token,
    chartData: state.token.chartData
  };
};

class Token extends React.Component<any, any> {
  public componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch(fetchToken({ address: params.address }));
    dispatch(fetchTokenChart({ address: params.address }));
  }

  public render() {
    const { token, chartData } = this.props;
    if (!token.address) {
      return '';
    }
    console.log(token);
    console.log(chartData);
    return (
      <div className="Token">
        <Header />
        <div className="container">
          <div className="main-wrapper">
            <div className="main-header">
              <div className="main-title">TOKEN DETAIL</div>
            </div>
            <div className="main-body">token body</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Token);
