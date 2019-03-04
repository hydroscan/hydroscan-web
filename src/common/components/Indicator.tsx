import React from 'react';
import { connect } from 'react-redux';
import './Indicator.scss';
import Loading from '../components/Loading';

const mapStateToProps = (state, props) => {
  return {};
};

class Indicator extends React.Component<any, any> {
  public render() {
    const { title, data, indicatorsLoading } = this.props;
    return (
      <div className="Indicator section-wrapper">
        {indicatorsLoading ? (
          <Loading />
        ) : (
          <div>
            <div className="title">{title}</div>
            <div className="content">{`${data}`}</div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Indicator);
