import React from 'react';
import { connect } from 'react-redux';
import './Indicator.scss';
import Loading from '../components/Loading';
import Tooltip from '@material-ui/core/Tooltip';

const mapStateToProps = (state, props) => {
  return {};
};

class Indicator extends React.Component<any, any> {
  public render() {
    const { title, data, indicatorsLoading, dataMore, date, showMore } = this.props;
    return (
      <div className="Indicator section-wrapper">
        {indicatorsLoading ? (
          <Loading />
        ) : (
          <div>
            <div className="title">
              <div className="text">{title}</div>
              {showMore && (
                <Tooltip
                  title={
                    <React.Fragment>
                      <div className="tooltip-more">
                        <div className="date-more">{dataMore}</div>
                        <div className="date">{date}</div>
                      </div>
                    </React.Fragment>
                  }
                  placement="top">
                  <img className="data-more-img" src={require('../images/more.svg')} />
                </Tooltip>
              )}
            </div>
            <div className="content">{`${data}`}</div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Indicator);
