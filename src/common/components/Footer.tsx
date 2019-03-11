import React from 'react';
import { connect } from 'react-redux';
import './Footer.scss';
import copy from 'clipboard-copy';
import Toastify from 'toastify-js';

const mapStateToProps = state => {
  return {};
};

class Footer extends React.PureComponent<any, any> {
  private donateAddress = '0xE3Cba0C3ce94365D3E59C7bA6352D598DBCc00b1';

  constructor(props) {
    super(props);
  }

  public handleCopy() {
    copy(this.donateAddress);
    Toastify({
      text: 'Copied successfully!',
      duration: 3000,
      gravity: 'bottom',
      backgroundColor: '#6872e0'
    }).showToast();
  }

  public render() {
    return (
      <div className="Footer">
        <div className="container">
          <div className="content-wrapper">
            <div className="donate">Donate to Help us Improve</div>
            <div className="copy-wrapper">
              <div className="address">{this.donateAddress}</div>
              <div
                className="copy gradient"
                onClick={() => {
                  this.handleCopy();
                }}>
                Copy Address
              </div>
            </div>
            <div className="link-wrapper">
              <a href="https://github.com/hydroscan" target="_black">
                <img className="github" src={require('../images/github.svg')} />
              </a>
              <a href={`https://etherscan.io/address/${this.donateAddress}`} target="_black">
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
