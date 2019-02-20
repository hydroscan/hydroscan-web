import React from 'react';
import { connect } from 'react-redux';
import Indicator from './Indicator';
import './Indicators.scss';

const mapStateToProps = state => {
  return {};
};

class Indicators extends React.PureComponent<any, any> {
  public render() {
    return (
      <div className="Indicators">
        <div className="indicator-wrapper">
          <Indicator />
        </div>
        <div className="indicator-wrapper">
          <Indicator />
        </div>
        <div className="indicator-wrapper">
          <Indicator />
        </div>
        <div className="indicator-wrapper">
          <Indicator />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Indicators);
