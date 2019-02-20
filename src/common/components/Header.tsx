import React from 'react';
import { connect } from 'react-redux';
import './Header.scss';

const mapStateToProps = state => {
  return {};
};

class Header extends React.PureComponent<any, any> {
  public render() {
    return <div className="Header">Hydroscan Header</div>;
  }
}

export default connect(mapStateToProps)(Header);
