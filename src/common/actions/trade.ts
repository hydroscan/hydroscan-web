export const fetchTrades = () => {
  return {
    type: 'FETCH_TRADES'
  };
};

export const fetchTradesLatest = () => {
  return {
    type: 'FETCH_TRADES_LATEST'
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
