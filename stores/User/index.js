const initialState = {
    listUser: []
  };
  
  const userReducer = (state = initialState, action) => {
    let { type, data } = action;
    switch (type) {
      case "SET_ALL_USER":
        return {
          ...state,
          listUser: data,
        };
      default:
        return state;
    }
  };
  export default userReducer;