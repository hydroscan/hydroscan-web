export const fetchTrades = payload => {
  return {
    type: 'FETCH_TRADES',
    payload
  };
};

export const fetchTradesLatest = () => {
  return {
    type: 'FETCH_TRADES_LATEST'
  };
};

export const setTradesLatest = payload => {
  return {
    type: 'SET_TRADES_LATEST',
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

export const fetchTradesChart = () => {
  return {
    type: 'FETCH_TRADES_CHART'
  };
};

export const setTradesChart = payload => {
  return {
    type: 'SET_TRADES_CHART',
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
