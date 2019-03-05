import React from 'react';
import { connect } from 'react-redux';
import './Footer.scss';

const mapStateToProps = state => {
  return {};
};

class Footer extends React.PureComponent<any, any> {
  public render() {
    return (
      <div className="Footer">
        <div className="container">
          <div className="content-wrapper">
            <div className="col1-wrapper">
              <div className="headline">HYDRO FOUNDATION</div>
              <div className="item">
                <a href="https://hydroprotocol.io/" target="_blank">
                  Hydro Protocol
                </a>
              </div>
              <div className="item">
                <a href="https://medium.com/hydro-protocol" target="_blank">
                  News and Updates
                </a>
              </div>
            </div>
            <div className="col2-wrapper">
              <div className="headline">DEVELOPER</div>
              <div className="item">
                <a href="https://github.com/HydroProtocol" target="_blank">
                  Github
                </a>
              </div>
              <div className="item">
                <a href="https://github.com/HydroProtocol/protocol" target="_blank">
                  Smart Contracts
                </a>
              </div>
            </div>
            <div className="col3-wrapper">
              <div className="headline">CONNECT</div>
              <div className="item">
                <a href="https://twitter.com/protocol_hydro" target="_blank">
                  Twitter
                </a>
              </div>
              <div className="item">
                <a href="https://www.reddit.com/r/hydroprotocol/" target="_blank">
                  Reddit
                </a>
              </div>
              <div className="item">
                <a href="https://t.me/hydroprotocol" target="_blank">
                  Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-line" />
        <div className="bottom-container">
          <div className="container">
            <div className="copyright">COPYRIGHT 2019 © HydroProtocol.io ALL RIGHTS RESERVED</div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Footer);
