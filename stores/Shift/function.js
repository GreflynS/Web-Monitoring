import { baseAxios } from "../index";

export async function createShift(data) {
  console.log(data, "DATA YANG DI KIRIM");
  try {
    const response = await baseAxios.post("shift/createshift", data, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    console.log(response, "BERHASIL");
    return response;
  } catch (err) {
    console.log("error upload", err);
  }
}

export async function getAllShift(dispatch) {
  try {
    const response = await baseAxios.get("shift/getshift", {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    dispatch({ type: "SET_ALL_SHIFT", data: response.data });
    console.log(response, "BERHASIL");
    return response;
  } catch (err) {
    console.log("error upload", err);
  }
}

export async function deleteShift(id) {
  try {
    const response = await baseAxios.delete(`shift/deleteShift?id=${id}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });

    return response.data;
  } catch (err) {
    console.error("Delete shift error:", err);
    throw err;
  }
}
