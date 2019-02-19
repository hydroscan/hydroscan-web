import Button from '@material-ui/core/Button';
import React from 'react';
import { connect } from 'react-redux';

import { fetchTrades } from '../actions/trade';

const mapStateToProps = state => {
  return {
    trades: state.trade,
  };
};

class FetchTradesButton extends React.Component<any, any> {
  public render() {
    const { dispatch } = this.props;
    // console.log('trades:', JSON.stringify(this.props.trades));
    return (
      <div>
        <div>{JSON.stringify(this.props.trades)}</div>
        <Button variant="contained" color="primary" onClick={() => dispatch(fetchTrades())}>
          fetchTrades
        </Button>
      </div>
    );
  }
}

export default connect(mapStateToProps)(FetchTradesButton);
