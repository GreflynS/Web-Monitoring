const initialState = {
  listArea: [],
  jamLaporan: [],
  listLaporan: [],
  totalVisitHariIni: '-',
  totalProblem: '-',
  kpi1: [],
  kpi2: {
    categories: [],
    series: [],
  },
};

const monitoringReducer = (state = initialState, action) => {
  let { type, data } = action;

  switch (type) {
    case 'SET_LISTAREA':
      return {
        ...state,
        listArea: data,
      };
    case 'SET_JAMLAPORAN':
      return {
        ...state,
        jamLaporan: data,
      };
    case 'SET_LISTLAPORAN':
      return {
        ...state,
        listLaporan: data,
      };
    case 'SET_TOTALVISITHARIINI':
      return {
        ...state,
        totalVisitHariIni: data,
      };
    case 'SET_TOTALPROBLEM':
      return {
        ...state,
        totalProblem: data,
      };
    case 'SET_KPI1':
      return {
        ...state,
        kpi1: data,
      };
    case 'SET_KPI2':
      return {
        ...state,
        kpi2: data,
      };
    default:
      return state;
  }
};

export default monitoringReducer;
