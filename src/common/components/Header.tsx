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
    this.state = { keyword: '', showMenu: false };
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

  public search() {
    const { keyword } = this.state;
    fetch(`${HYDROSCAN_API_URL}/api/v1/trades_search?keyword=${keyword}`)
      .then(response => {
        return response.json();
      })
      .then(searchParams => {
        this.doSearch(searchParams);
      });
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
      <div>
        <div className="Header header-gradient">
          <div className="header-container">
            <Link className="link" to="/">
              <img src={require('../images/hydroscan.svg')} />
            </Link>
            <div className="tabs">
              <Link className="tab" to="/relayers">
                <img src={require('../images/relayers.svg')} />
                <div> RELAYERS</div>
              </Link>

              <Link className="tab" to="/tokens">
                <img src={require('../images/tokens.svg')} />
                <div> TOKENS</div>
              </Link>

              <Link className="tab" to="/trades">
                <img src={require('../images/trades.svg')} />
                <div> TRADES</div>
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

        <div className="Header-sm header-gradient">
          <div className="header-container">
            <Link className="link" to="/">
              <img src={require('../images/hydroscan.svg')} />
            </Link>
            <i className="fa fa-ellipsis-v" aria-hidden="true" onClick={this.openMenu.bind(this)} />
          </div>
          {this.state.showMenu && (
            <div className="header-menu">
              <i className="fa fa-times close" aria-hidden="true" onClick={this.closeMenu.bind(this)} />
              <div className="search-wrapper">
                <div className="search-icon-wrapper" onClick={this.search.bind(this)}>
                  <i className="fa fa-search" aria-hidden="true" />
                </div>
                <input
                  value={this.state.keyword}
                  onKeyDown={this.keyPress.bind(this)}
                  onChange={this.handleChange.bind(this)}
                  className="search-input"
                  placeholder="Search Address, transaction, token"
                />
              </div>
              <div className="tabs">
                <div className="tab" onClick={this.handleLink.bind(this, '/relayers')}>
                  RELAYERS
                </div>
                <div className="tab" onClick={this.handleLink.bind(this, '/tokens')}>
                  TOKENS
                </div>
                <div className="tab" onClick={this.handleLink.bind(this, '/trades')}>
                  TRADES
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  public openMenu() {
    this.setState({ showMenu: true });
  }

  public closeMenu() {
    this.setState({ showMenu: false });
  }

  public handleLink(link) {
    const { router } = this.props;
    this.setState({ showMenu: false });
    router.push(link);
  }
}

export default connect(mapStateToProps)(withRouter(Header));
