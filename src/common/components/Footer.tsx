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
            <div className="donate">Donate to Help us Improve</div>
            <div className="copy-wrapper">
              <div className="address">0xE3Cba0C3ce94365D3E59C7bA6352D598DBCc00b1</div>
              <div className="copy gradient">Copy Address</div>
            </div>
            <div className="link-wrapper">
              <a href="https://github.com/hydroscan" target="_black">
                <img className="github" src={require('../images/github.svg')} />
              </a>
              <a href="https://etherscan.io/address/0xE3Cba0C3ce94365D3E59C7bA6352D598DBCc00b1" target="_black">
                <img className="etherscan" src={require('../images/etherscan.png')} />
              </a>
            </div>
          </div>
        </div>
        <div className="bottom-line" />
        <div className="bottom-container">
          <div className="container">
            <div className="copyright">COPYRIGHT 2019 © HydroScan.io ALL RIGHTS RESERVED</div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Footer);
