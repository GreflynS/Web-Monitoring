const initialState = {
    dataPatrol:[],
    paginatePatrol:[]
  };
  
  const patrolReducer = (state = initialState, action) => {
    let { type, data } = action;
    switch (type) {
      case "SET_ALL_PATROL":
        return {
          ...state,
          dataPatrol: data,
        };
        case "SET_ALL_PATROL_PAGINATE":
          return {
            ...state,
            paginatePatrol: data,
          };
      default:
        return state;
    }
  };
  export default patrolReducer;