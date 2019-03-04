const initialState: any = {
  tokens: [],
  page: 1,
  pageSize: 0,
  total: 0,
  tokensLoading: false,

  tokensTop: [],
  tokensTopLoading: false,

  chartData: [],
  chartDataLoading: false,

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

    case 'SET_TOKENS_TOP':
      return {
        ...state,
        tokensTop: action.payload.tokensTop
      };
    case 'SET_TOKENS_TOP_LOADING':
      return {
        ...state,
        tokensTopLoading: action.payload.loading
      };

    case 'SET_TOKEN_CHART':
      return {
        ...state,
        chartData: action.payload.chartData
      };
    case 'SET_TOKEN_CHART_LOADING':
      return {
        ...state,
        chartDataLoading: action.payload.loading
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
