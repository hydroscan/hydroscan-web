import React, { Component } from 'react';
import './Loading.scss';

export default class Loading extends Component<any, any> {
  public render() {
    const { text } = this.props;
    return (
      <div className="Loading">
        <img src={require('../images/loading.svg')} />
      </div>
    );
  }
}
