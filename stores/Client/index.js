const initialState = {
    listClient: []
  };
  
  const clientReducer = (state = initialState, action) => {
    let { type, data } = action;
    switch (type) {
      case "SET_ALL_CLIENT":
        return {
          ...state,
          listClient: data,
        };
      default:
        return state;
    }
  };
  export default clientReducer;