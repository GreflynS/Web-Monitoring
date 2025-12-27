const initialState = {
    listShift: []
  };
  
  const shiftReducer = (state = initialState, action) => {
    let { type, data } = action;
    switch (type) {
      case "SET_ALL_SHIFT":
        return {
          ...state,
          listShift: data,
        };
      default:
        return state;
    }
  };
  export default shiftReducer;