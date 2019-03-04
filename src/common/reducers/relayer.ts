const initialState: any = {
  relayers: [],
  relayersLoading: false
};

const relayer = (state: any = initialState, action: any): any => {
  switch (action.type) {
    case 'SET_RELAYERS':
      return {
        ...state,
        relayers: action.payload.relayers
      };
    case 'SET_RELAYERS_LOADING':
      return {
        ...state,
        relayersLoading: action.payload.loading
      };
    default:
      return state;
  }
};

export default relayer;
