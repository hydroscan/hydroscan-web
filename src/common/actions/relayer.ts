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
