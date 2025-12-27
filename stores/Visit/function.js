import { baseAxios } from "../index";

export async function createVisit(data) {
  try {
    const response = await baseAxios.post("visit/createvisit", data, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return response;
  } catch (err) {
    console.log("error upload", err);
  }
}

export async function getAllVisit(dispatch, data, history) {
  console.log(data, "Data Visit");
  try {
    const response = await baseAxios.get(
      `visit/getvisit?dariTgl=${data.dariTgl}&smpTgl=${data.smpTgl}&page=${data.page}&limit=${data.limit}&dari=${data.dari}&sampai=${data.sampai}&search=${data.search}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    dispatch({ type: "SET_ALL_VISIT", data: response.data.data });
    dispatch({ type: "SET_ALL_VISIT_PAGINATE", data: response.data });
    console.log(response, "OKEE");
    return response;
  } catch (err) {
    console.log("error upload", err);
  }
}

export async function deleteVisit(id) {
  try {
    const response = await baseAxios.delete(`visit/deleteVisit?id=${id}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
}
