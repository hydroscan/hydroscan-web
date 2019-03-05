export const fetchRelayers = () => {
  return {
    type: 'FETCH_RELAYERS'
  };
};

export const setRelayers = payload => {
  return {
    type: 'SET_RELAYERS',
    payload
  };
};

export const setRelayersLoading = payload => {
  return {
    type: 'SET_RELAYERS_LOADING',
    payload
  };
};

export const fetchRelayer = payload => {
  return {
    type: 'FETCH_RELAYER',
    payload
  };
};

export const setRelayer = payload => {
  return {
    type: 'SET_RELAYER',
    payload
  };
};

export const setRelayerLoading = payload => {
  return {
    type: 'SET_RELAYER_LOADING',
    payload
  };
};
