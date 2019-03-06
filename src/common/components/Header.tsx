import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'found';
import './Header.scss';
import fetch from 'isomorphic-fetch';
import { HYDROSCAN_API_URL } from '../lib/config';

const mapStateToProps = (state, props) => {
  return {};
};

class Header extends React.PureComponent<any, any> {
  constructor(props) {
    super(props);
    this.state = { keyword: '' };
  }

  public handleChange(e) {
    this.setState({ keyword: e.target.value });
  }

  public keyPress(e) {
    const EnterKeyCode = 13;
    if (e.keyCode === EnterKeyCode) {
      fetch(`${HYDROSCAN_API_URL}/api/v1/trades_search?keyword=${e.target.value}`)
        .then(response => {
          return response.json();
        })
        .then(searchParams => {
          this.doSearch(searchParams);
        });
    }
  }

  public doSearch(searchParams) {
    const { router } = this.props;
    switch (searchParams.searchType) {
      case 'TOKEN':
        router.push(`/tokens/${searchParams.searchKey}`);
        break;
      case 'RELAYER':
        router.push(`/relayers/${searchParams.searchKey}`);
        break;
      case 'TRADER':
        router.push(`/traders/${searchParams.searchKey}`);
        break;
      case 'TRANSACTION':
        router.push(`/trades?transaction=${searchParams.searchKey}`);
        break;
      case 'TOKENS':
        router.push(`/tokens?keyword=${searchParams.searchKey}`);
        break;
      default:
        console.log('no result');
        router.push(`/trades`);
        break;
    }
  }

  public render() {
    return (
      <div className="Header">
        <div className="header-container">
          <Link className="link" to="/">
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
            <input
              value={this.state.keyword}
              onKeyDown={this.keyPress.bind(this)}
              onChange={this.handleChange.bind(this)}
              className="search-input"
              placeholder="Search Address, transaction, token"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(withRouter(Header));
