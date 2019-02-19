export const fetchTrades = () => {
  return {
    type: 'FETCH_TRADES',
  };
};

export const setTrades = payload => {
  return {
    type: 'SET_TRADES',
    payload,
  };
};

export const setTradesLoading = payload => {
  return {
    type: 'SET_TRADES_LOADING',
    payload,
  };
};
