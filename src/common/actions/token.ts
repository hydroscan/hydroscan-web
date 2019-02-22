export const fetchTokens = () => {
  return {
    type: 'FETCH_TOKENS'
  };
};

export const fetchTokensTop = () => {
  return {
    type: 'FETCH_TOKENS_TOP'
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
