const initialState: any = {
  notFound: false
};

const relayer = (state: any = initialState, action: any): any => {
  switch (action.type) {
    case 'SET_NOT_FOUND':
      return {
        ...state,
        notFound: action.payload.notFound
      };
    default:
      return state;
  }
};

export default relayer;
