import { baseAxios } from "../index";

export async function createTraining(data) {
  try {
    const response = await baseAxios.post("training/createtraining", data, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return response;
  } catch (err) {
    console.log("error upload", err);
  }
}

export async function getAllTraining(dispatch, data, history) {
  // console.log(data, "Pepek");
  try {
    const response = await baseAxios.get(
      `training/gettraining?dariTgl=${data.dariTgl}&smpTgl=${data.smpTgl}&page=${data.page}&limit=${data.limit}&search=${data.search}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    dispatch({ type: "SET_ALL_TRAINING", data: response.data.data });
    dispatch({ type: "SET_ALL_TRAINING_PAGINATE", data: response.data });
    console.log(response, "hellyeah");
    return response;
  } catch (err) {
    console.log("error upload", err);
  }
}

export async function getAllGrafikTraining(dispatch, data) {
  try {
    const response = await baseAxios.get(
      `training/grafiktraining?dariTgl=${data.dariTgl}&smpTgl=${data.smpTgl}`,
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
    dispatch({ type: "SET_ALL_TRAINING", data: response.data.data });
    return response.data;
  } catch (err) {
    console.error("Error fetching training graph data:", err);
    throw err;
  }
}

export async function deleteTraining(id) {
  try {
    const response = await baseAxios.delete(
      `training/deleteTraining?id=${id}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error("Delete training error:", err);
    throw err;
  }
}
