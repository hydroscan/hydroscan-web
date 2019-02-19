const initialState: any = {
  list: [],
  loading: false,
};

const trade = (state: any = initialState, action: any): any => {
  switch (action.type) {
    case 'SET_TRADES_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_TRADES':
      return {
        ...state,
        list: state.list.concat(action.payload.trades),
      };

    default:
      return state;
  }
};

export default trade;
