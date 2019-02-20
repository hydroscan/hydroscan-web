import React from 'react';
import { connect } from 'react-redux';
import './TopTokens.scss';

const mapStateToProps = state => {
  return {};
};

class TopTokens extends React.PureComponent<any, any> {
  public render() {
    return <div className="TopTokens">Hydroscan TopTokens</div>;
  }
}

export default connect(mapStateToProps)(TopTokens);
