import { baseAxios, errorHandler } from "../index";

export async function createRuangan(data) {
  try {
    const response = await baseAxios.post("ruangan/createruangan", data, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    // console.log(response,"RESSSSSS")
    return response;
  } catch (err) {
    console.log("error upload", err);
    return errorHandler(err.response);
  }
}

export async function getAllRuangan(dispatch) {
  try {
    const response = await baseAxios.get("ruangan/getruangan", {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    dispatch({ type: "SET_ALL_RUANGAN", data: response.data });
    console.log(response, "BERHASIL");
    return response;
  } catch (err) {
    console.log("error upload", err);
    return errorHandler(err.response);
  }
}

export async function deleteRuangan(id) {
  try {
    const response = await baseAxios.delete(`ruangan/deleteRuangan?id=${id}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });

    return response.data;
  } catch (err) {
    console.error("Delete ruangan error:", err);
    throw err;
  }
}
