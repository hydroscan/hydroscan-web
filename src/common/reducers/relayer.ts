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
      const relayers: any[] = [];
      const relayersNoTrade: any[] = [];
      for (const r of action.payload.relayers) {
        if (r.trades24h === 0) {
          relayersNoTrade.push(r);
        } else {
          relayers.push(r);
        }
      }

      for (const r of relayersNoTrade) {
        if (!r.name.startsWith('Relayer-')) {
          relayers.push(r);
        }
      }

      for (const r of relayersNoTrade) {
        if (r.name.startsWith('Relayer-')) {
          relayers.push(r);
        }
      }

      return {
        ...state,
        relayers
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
