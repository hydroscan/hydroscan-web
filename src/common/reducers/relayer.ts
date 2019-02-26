const initialState: any = {
  relayers: [],
  relayersLoading: false
};

const relayer = (state: any = initialState, action: any): any => {
  switch (action.type) {
    case 'SET_RELAYERS_LOADING':
      return {
        ...state,
        relayersLoading: action.payload
      };
    case 'UPDATE_RELAYERS':
      return {
        ...state,
        relayers: state.relayers.concat(action.payload.relayers)
      };

    case 'SET_RELAYERS':
      return {
        ...state,
        relayers: action.payload.relayers
      };

    default:
      return state;
  }
};

export default relayer;
