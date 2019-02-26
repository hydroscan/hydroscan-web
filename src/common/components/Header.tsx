import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'found';
import './Header.scss';

const mapStateToProps = state => {
  return {};
};

class Header extends React.PureComponent<any, any> {
  public render() {
    return (
      <div className="Header">
        <div className="header-container">
          <Link to="/">
            <img src={require('../images/hydroscan.svg')} />
          </Link>
          <div className="tabs">
            <Link className="tab" to="/relayers">
              RELAYERS
            </Link>

            <Link className="tab" to="/tokens">
              TOKENS
            </Link>

            <Link className="tab" to="/trades">
              TRADES
            </Link>
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
