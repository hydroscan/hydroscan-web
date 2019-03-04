const initialState: any = {
  tokens: [],
  page: 1,
  pageSize: 0,
  total: 0,
  tokensLoading: false,

  token: {},
  tokenLoading: false
};

const token = (state: any = initialState, action: any): any => {
  switch (action.type) {
    case 'SET_TOKENS':
      return {
        ...state,
        ...action.payload
      };
    case 'SET_TOKENS_LOADING':
      return {
        ...state,
        tokensLoading: action.payload.loading
      };

    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload.token
      };
    case 'SET_TOKEN_LOADING':
      return {
        ...state,
        tokenLoading: action.payload.loading
      };
    default:
      return state;
  }
};

export default token;
