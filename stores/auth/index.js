const initialState = {
  username: "",
  idClient: "",
  idCabang: "",
  role: "",
  menu: [],
  perusahaan: "",
  responLogin: null,
};

const authReducer = (state = initialState, action) => {
  let { type, data } = action;
  switch (type) {
    case "SET_IDENTITY":
      return {
        ...state,
        username: data,
        idClient: data,
        idCabang: data,
        role: data,
        menu: data,
        perusahaan: data,
      };
    default:
      return state;
  }
};

export default authReducer;
