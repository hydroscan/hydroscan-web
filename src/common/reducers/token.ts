const initialState: any = {
  tokens: [],
  page: 1,
  pageSize: 0,
  total: 0,
  tokensLoading: false,

  tokensTop: [],

  chartData: [],
  token: {}
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
    case 'SET_TOKEN_CHART':
      return {
        ...state,
        chartData: action.payload.chartData
      };
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload.token
      };
    default:
      return state;
  }
};

export default token;
