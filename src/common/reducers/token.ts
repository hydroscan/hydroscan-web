const initialState: any = {
  tokens: [],
  page: 1,
  pageSize: 0,
  total: 0,
  tokensLoading: false,

  tokensTop: []
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
        ...action.payload
      };

    case 'SET_TOKENS_TOP':
      return {
        ...state,
        tokensTop: action.payload.tokensTop
      };

    default:
      return state;
  }
};

export default token;
