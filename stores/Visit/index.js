const initialState = {
    listVisit: [],
    paginateVisit:[]
  };
  
  const visitReducer = (state = initialState, action) => {
    let { type, data } = action;
    switch (type) {
      case "SET_ALL_VISIT":
        return {
          ...state,
          dataVisit: data,
        };
        case "SET_ALL_VISIT_PAGINATE":
          return {
            ...state,
            paginateVisit: data,
          };
      default:
        return state;
    }
  };
  export default visitReducer;