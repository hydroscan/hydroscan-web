import React from 'react';
import { Link } from 'found';
import { connect } from 'react-redux';
import './NotFound.scss';
import { setNotFound } from '../actions/notFound';
import { fetchTradesIndicators, fetchTradesChart, fetchTrades } from '../actions/trade';
import { fetchTokens } from '../actions/token';

const mapStateToProps = (state, props) => {
  return {
    notFound: state.notFound.notFound
  };
};

class NotFound extends React.Component<any, any> {
  public componentDidMount() {
    const { dispatch } = this.props;
    dispatch(setNotFound({ notFound: false }));

    dispatch(fetchTradesIndicators());
    dispatch(fetchTradesChart({ tab: '1M' }));
    dispatch(fetchTokens({ pageSize: 10, tab: '24H' }));
    dispatch(fetchTrades({ pageSize: 8 }));
  }

  public render() {
    return (
      <div className="NotFound">
        <div className="item-wrapper">
          <img className="not-found-left" src={require('../images/404-left.png')} />
          <img className="hydroscan-gray" src={require('../images/hydroscan-gray.png')} />
          <img className="not-found-right" src={require('../images/404-right.png')} />
        </div>
        <div className="item-wrapper">
          <img className="not-found-text" src={require('../images/404.png')} />
        </div>
        <div className="item-wrapper">
          <div className="sorry">Sorry. The page you are looking for does not exist or has been removed.</div>
        </div>
        <div className="item-wrapper">
          <Link className="link" to="/">
            Go to Home Page
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(NotFound);
