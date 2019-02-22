const initialState: any = {
  tokens: [],
  tokensLoading: false
};

const token = (state: any = initialState, action: any): any => {
  switch (action.type) {
    case 'SET_TOKENS_LOADING':
      return {
        ...state,
        tokensLoading: action.payload
      };
    case 'UPDATE_TOKENS':
      return {
        ...state,
        tokens: state.tokens.concat(action.payload.tokens)
      };

    case 'SET_TOKENS':
      return {
        ...state,
        tokens: action.payload.tokens
      };

    default:
      return state;
  }
};

export default token;
