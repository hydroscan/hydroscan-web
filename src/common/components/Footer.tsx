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
            <div className="hydro-wrapper">
              <div className="headline">HYDRO FOUNDATION</div>
              <div className="item">Hydro Protocol</div>
              <div className="item">News and Updates</div>
            </div>
            <div className="developer-wrapper">
              <div className="headline">DEVELOPER</div>
              <div className="item">Github</div>
              <div className="item">Smart Contracts</div>
              <div className="item">Wiki</div>
            </div>
            <div className="products-wrapper">
              <div className="headline">Products</div>
              <div className="item">DDEX</div>
              <div className="item">Hydro Swap</div>
            </div>
            <div className="links-wrapper">links</div>
          </div>
        </div>
        <div className="bottom-line" />
        <div className="container bottom-container">
          <div className="copyright">COPYRIGHT 2019 © HydroProtocol.io ALL RIGHTS RESERVED</div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Footer);
