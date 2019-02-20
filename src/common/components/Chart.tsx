import React from 'react';
import { connect } from 'react-redux';
import './Chart.scss';

const mapStateToProps = state => {
  return {};
};

class Chart extends React.PureComponent<any, any> {
  public render() {
    return <div className="Chart">Hydroscan Chart</div>;
  }
}

export default connect(mapStateToProps)(Chart);
