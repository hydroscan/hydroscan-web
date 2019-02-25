import React from 'react';
import { connect } from 'react-redux';
import './Header.scss';

const mapStateToProps = state => {
  return {};
};

class Header extends React.PureComponent<any, any> {
  public render() {
    return (
      <div className="Header">
        <div className="header-container">
          <img src={require('../images/hydroscan.svg')} />
          <div className="tabs">
            <div className="tab">RELAYERS</div>
            <div className="tab">TOKENS</div>
            <div className="tab">TRADES</div>
          </div>
          <div className="search-wrapper">
            <i className="fa fa-search" aria-hidden="true" />
            <input className="search-input" placeholder="Search Address, transaction, token" />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Header);
