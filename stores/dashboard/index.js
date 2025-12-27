const initialState = {
  totalPelangganAktif: "-",
  belumBayarBulan: [],
  pemasukanBulanIni: "-",
  sisaPerangkat: "-",
  ppoe: [],
  groupKecamatan: [],
  chartMingguan: null,
};

const pelangganReducer = (state = initialState, action) => {
  let { type, data } = action;

  switch (type) {
    case "SET_GROUPKECAMATAN":
      return {
        ...state,
        groupKecamatan: data,
      };
    case "SET_CHARTMINGGUAN":
      return {
        ...state,
        chartMingguan: data,
      };
    case "DELETE_PPOE":
      let tmp = [
        ...state.ppoe.slice(0, data),
        ...state.ppoe.slice(data + 1, state.ppoe.length + 1),
      ];

      return {
        ...state,
        ppoe: tmp,
      };
    case "SET_PPOE":
      return {
        ...state,
        ppoe: data,
      };
    case "SET_TOTALPELANGGANAKTIF":
      return {
        ...state,
        totalPelangganAktif: data,
      };
    case "SET_PEMASUKANBULANINI":
      return {
        ...state,
        pemasukanBulanIni: data,
      };
    case "SET_PELANGGANBELUMBAYAR":
      return {
        ...state,
        belumBayarBulan: data,
      };
    case "SET_SISAPERANGKAT":
      return {
        ...state,
        sisaPerangkat: data,
      };
    case "CUT_BELUMBAYAR":
      return {
        ...state,
        belumBayarBulan: [
          ...state.belumBayarBulan.slice(0, data),
          ...state.belumBayarBulan.slice(
            data + 1,
            state.belumBayarBulan.length
          ),
        ],
      };
    default:
      return state;
  }
};

export default pelangganReducer;
