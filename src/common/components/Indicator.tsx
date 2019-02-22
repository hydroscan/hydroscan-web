import React from 'react';
import { connect } from 'react-redux';
import './Indicator.scss';

interface Props {
  title: string;
  data: string;
}

const mapStateToProps = (state: any, ownProps?: Props) => {
  return {};
};

class Indicator extends React.Component<Props, any> {
  public render() {
    const { title, data } = this.props;
    return (
      <div className="Indicator">
        <div className="title">{title}</div>
        <div className="content">{`${data}`}</div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Indicator);
