const initialState = {
  listTraining: [],
  paginateTraining:[]
};

const trainingReducer = (state = initialState, action) => {
  let { type, data } = action;
  switch (type) {
    case "SET_ALL_TRAINING":
      return {
        ...state,
        dataTraining: data,
      };
      case "SET_ALL_TRAINING_PAGINATE":
        return {
          ...state,
          paginateTraining: data,
        };
    default:
      return state;
  }
};
export default trainingReducer;