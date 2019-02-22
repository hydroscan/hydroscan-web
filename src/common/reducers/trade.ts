const initialState: any = {
  trades: [],
  tradesLoading: false,
  indicators: {},
  indicatorsLoading: false,
  chartData: [],
  chartDataLoading: false
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
        trades: action.payload.trades
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
    default:
      return state;
  }
};

export default trade;
