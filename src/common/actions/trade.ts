export const fetchTrades = payload => {
  return {
    type: 'FETCH_TRADES',
    payload
  };
};

export const setTrades = payload => {
  return {
    type: 'SET_TRADES',
    payload
  };
};

export const setTradesLoading = payload => {
  return {
    type: 'SET_TRADES_LOADING',
    payload
  };
};

export const fetchTradesIndicators = () => {
  return {
    type: 'FETCH_TRADES_INDICATORS'
  };
};

export const setTradesIndicators = payload => {
  return {
    type: 'SET_TRADES_INDICATORS',
    payload
  };
};

export const setTradesIndicatorsLoading = payload => {
  return {
    type: 'SET_TRADES_INDICATORS_LOADING',
    payload
  };
};

export const fetchTradesChart = payload => {
  return {
    type: 'FETCH_TRADES_CHART',
    payload
  };
};

export const setTradesChart = payload => {
  return {
    type: 'SET_TRADES_CHART',
    payload
  };
};

export const setTradesChartLoading = payload => {
  return {
    type: 'SET_TRADES_CHART_LOADING',
    payload
  };
};

export const fetchTrade = payload => {
  return {
    type: 'FETCH_TRADE',
    payload
  };
};

export const setTrade = payload => {
  return {
    type: 'SET_TRADE',
    payload
  };
};

export const setTradeLoading = payload => {
  return {
    type: 'SET_TRADE_LOADING',
    payload
  };
};
