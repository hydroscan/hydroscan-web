export const fetchTokens = payload => {
  return {
    type: 'FETCH_TOKENS',
    payload
  };
};

export const fetchTokensTop = payload => {
  return {
    type: 'FETCH_TOKENS_TOP',
    payload
  };
};

export const setTokens = payload => {
  return {
    type: 'SET_TOKENS',
    payload
  };
};

export const setTokensTop = payload => {
  return {
    type: 'SET_TOKENS_TOP',
    payload
  };
};

export const setTokensLoading = payload => {
  return {
    type: 'SET_TOKENS_LOADING',
    payload
  };
};
