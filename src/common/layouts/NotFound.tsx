import React from 'react';
import { Link } from 'found';
import './NotFound.scss';

class NotFound extends React.Component {
  public render() {
    return (
      <div className="NotFound">
        <div className="item-wrapper">
          <img className="not-found-left" src={require('../images/404-left.png')} />
          <img className="hydroscan-gray" src={require('../images/hydroscan-gray.png')} />
          <img className="not-found-right" src={require('../images/404-right.png')} />
        </div>
        <div className="item-wrapper">
          <img className="not-found-text" src={require('../images/404.png')} />
        </div>
        <div className="item-wrapper">
          <div className="sorry">Sorry. The page you are looking for does not exist or has been removed.</div>
        </div>
        <div className="item-wrapper">
          <Link className="link" to="/">
            Go to Home Page
          </Link>
        </div>
      </div>
    );
  }
}

export default NotFound;
