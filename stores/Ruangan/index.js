const initialState = {
    listRuangan: []
  };
  
  const ruanganReducer = (state = initialState, action) => {
    let { type, data } = action;
    switch (type) {
      case "SET_ALL_RUANGAN":
        return {
          ...state,
          listRuangan: data,
        };
      default:
        return state;
    }
  };
  export default ruanganReducer;