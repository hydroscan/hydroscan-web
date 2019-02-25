export const fetchTokens = () => {
  return {
    type: 'FETCH_TOKENS'
  };
};

export const fetchTokensTop = (filter: string = '24H') => {
  return {
    type: 'FETCH_TOKENS_TOP',
    payload: {
      filter
    }
  };
};

export const setTokens = payload => {
  return {
    type: 'SET_TOKENS',
    payload
  };
};

export const setTokensLoading = payload => {
  return {
    type: 'SET_TOKENS_LOADING',
    payload
  };
};
