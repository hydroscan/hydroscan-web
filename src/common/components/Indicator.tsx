import React from 'react';
import { connect } from 'react-redux';
import './Indicator.scss';

const mapStateToProps = state => {
  return {};
};

class Indicator extends React.PureComponent<any, any> {
  public render() {
    return (
      <div className="Indicator">
        <div className="title">NETWORK VOLUME (24H)</div>
        <div className="content">$123,245.12</div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Indicator);
