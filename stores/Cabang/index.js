const initialState = {
    listCabang: []
  };
  
  const cabangReducer = (state = initialState, action) => {
    let { type, data } = action;
    switch (type) {
      case "SET_ALL_CABANG":
        return {
          ...state,
          listCabang: data,
        };
      default:
        return state;
    }
  };
  export default cabangReducer;