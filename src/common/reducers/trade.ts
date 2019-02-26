const initialState: any = {
  trades: [],
  page: 1,
  pageSize: 0,
  totalPage: 0,
  total: 0,
  tradesLoading: false,

  indicators: {},
  chartData: [],
  tradesLatest: [],

  trade: {}
};

const trade = (state: any = initialState, action: any): any => {
  switch (action.type) {
    case 'SET_TRADES_LOADING':
      return {
        ...state,
        tradesLoading: action.payload
      };
    case 'UPDATE_TRADES':
      return {
        ...state,
        trades: state.trades.concat(action.payload.trades)
      };
    case 'SET_TRADES':
      return {
        ...state,
        ...action.payload
      };
    case 'SET_TRADES_LATEST':
      return {
        ...state,
        tradesLatest: action.payload.tradesLatest
      };
    case 'SET_TRADES_INDICATORS':
      return {
        ...state,
        indicators: action.payload.indicators
      };
    case 'SET_TRADES_CHART':
      return {
        ...state,
        chartData: action.payload.chartData
      };
    case 'SET_TRADE':
      return {
        ...state,
        trade: action.payload.trade
      };
    default:
      return state;
  }
};

export default trade;
