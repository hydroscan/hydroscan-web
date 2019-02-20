import React from 'react';
import { connect } from 'react-redux';
import './Footer.scss';

const mapStateToProps = state => {
  return {};
};

class Footer extends React.PureComponent<any, any> {
  public render() {
    return <div className="Footer">Hydroscan Footer</div>;
  }
}

export default connect(mapStateToProps)(Footer);
