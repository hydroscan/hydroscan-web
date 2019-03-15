const initialState: any = {
  trades: [],
  page: 1,
  pageSize: 0,
  total: 0,
  tradesLoading: false,

  indicators: {},
  indicatorsLoading: false,

  chartData: [],
  chartDataLoading: false,

  trade: {
    baseToken: {},
    quoteToken: {},
    relayer: {}
  },
  tradeLoading: false,

  trader: {
    topTokens: []
  },
  traderLoading: false
};

const trade = (state: any = initialState, action: any): any => {
  switch (action.type) {
    case 'RESET_TRADES_PAGE':
      return {
        ...state,
        page: 1
      };
    case 'SET_TRADES':
      return {
        ...state,
        ...action.payload
      };
    case 'SET_TRADES_LOADING':
      return {
        ...state,
        tradesLoading: action.payload.loading
      };

    case 'SET_TRADES_INDICATORS':
      return {
        ...state,
        indicators: action.payload.indicators
      };
    case 'SET_TRADES_INDICATORS_LOADING':
      return {
        ...state,
        indicatorsLoading: action.payload.loading
      };

    case 'SET_TRADES_CHART':
      return {
        ...state,
        chartData: action.payload.chartData
      };
    case 'SET_TRADES_CHART_LOADING':
      return {
        ...state,
        chartDataLoading: action.payload.loading
      };

    case 'SET_TRADE':
      return {
        ...state,
        trade: action.payload.trade
      };
    case 'SET_TRADE_LOADING':
      return {
        ...state,
        tradeLoading: action.payload.loading
      };

    case 'SET_TRADER':
      return {
        ...state,
        trader: action.payload.trader
      };
    case 'SET_TRADER_LOADING':
      return {
        ...state,
        traderLoading: action.payload.loading
      };
    default:
      return state;
  }
};

export default trade;
