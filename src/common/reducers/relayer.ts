const initialState: any = {
  relayers: [],
  relayersLoading: false,

  relayer: {
    topTokens: []
  },
  relayerLoading: false
};

const relayer = (state: any = initialState, action: any): any => {
  switch (action.type) {
    case 'SET_RELAYERS':
      console.log(action.payload.relayers);
      return {
        ...state,
        relayers: action.payload.relayers
      };
    case 'SET_RELAYERS_LOADING':
      return {
        ...state,
        relayersLoading: action.payload.loading
      };

    case 'SET_RELAYER':
      return {
        ...state,
        relayer: action.payload.relayer
      };
    case 'SET_RELAYER_LOADING':
      return {
        ...state,
        relayerLoading: action.payload.loading
      };
    default:
      return state;
  }
};

export default relayer;
