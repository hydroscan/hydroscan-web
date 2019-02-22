import React from 'react';
import { connect } from 'react-redux';
import './TopTokens.scss';
import { fetchTokensTop } from '../actions/token';

const mapStateToProps = state => {
  return {
    tokens: state.token.tokens
  };
};
class TopTokens extends React.PureComponent<any, any> {
  public componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchTokensTop());
  }
  public render() {
    return (
      <div className="TopTokens">
        <div className="section-header">TOP TOKENS</div>
        {this.props.tokens.map(token => {
          return <div>{token.name}</div>;
        })}
      </div>
    );
  }
}

export default connect(mapStateToProps)(TopTokens);
