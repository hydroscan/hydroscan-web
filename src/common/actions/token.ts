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

export const fetchTokenChart = payload => {
  return {
    type: 'FETCH_TOKEN_CHART',
    payload
  };
};

export const setTokenChart = payload => {
  return {
    type: 'SET_TOKEN_CHART',
    payload
  };
};

export const fetchToken = payload => {
  return {
    type: 'FETCH_TOKEN',
    payload
  };
};

export const setToken = payload => {
  return {
    type: 'SET_TOKEN',
    payload
  };
};
