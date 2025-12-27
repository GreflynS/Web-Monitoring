import { baseAxios } from "../index";

export async function createPatrol(data) {
  try {
    const token = localStorage.getItem("token"); // ambil token user
    const response = await baseAxios.post("patrol/createpatrol", data, {
      headers: {
        token,
        "Content-Type": "application/json",
      },
    });

    return response; // kembalikan response ke component
  } catch (err) {
    throw err; // biar bisa ditangani di component
  }
}

export async function getAllPatrol(dispatch, data) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token tidak tersedia");

    const response = await baseAxios.get(
      `patrol/getpatrol?dariTgl=${data.dariTgl}&smpTgl=${data.smpTgl}&page=${data.page}&limit=${data.limit}&dari=${data.dari}&sampai=${data.sampai}&search=${data.search}`,
      { headers: { token } }
    );
    dispatch({ type: "SET_ALL_PATROL", data: response.data.data });
    dispatch({ type: "SET_ALL_PATROL_PAGINATE", data: response.data });
    return response;
  } catch (err) {
    console.error("error getAllPatrol", err.response || err);
    throw err;
  }
}

export async function deletePatrol(id) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token tidak tersedia");

    const response = await baseAxios.delete(`patrol/deletePatrol?id=${id}`, {
      headers: { token },
    });
    return response.data;
  } catch (err) {
    console.error("Delete patrol error:", err.response || err);
    throw err;
  }
}
