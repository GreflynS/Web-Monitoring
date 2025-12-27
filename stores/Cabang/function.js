import { baseAxios } from "../index";

// Create Cabang
export async function createCabang(data) {
  try {
    const response = await baseAxios.post("cabang/createcabang", data, {
      headers: { token: localStorage.getItem("token") },
    });
    return response;
  } catch (err) {
    console.error("Error createCabang:", err);
    throw err;
  }
}

// Get All Cabang
export async function getAllCabang(dispatch) {
  try {
    const response = await baseAxios.get("cabang/getcabang", {
      headers: { token: localStorage.getItem("token") },
    });
    dispatch({ type: "SET_ALL_CABANG", data: response.data });
    return response;
  } catch (err) {
    console.error("Error getAllCabang:", err);
    throw err;
  }
}

// Update Cabang
export async function updateCabang(idCabang, data) {
  try {
    const response = await baseAxios.patch(
      `/cabang/updatecabang?idCabang=${idCabang}`, // ⬅️ perbaiki di sini
      data,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Update cabang error:", err.response?.data || err);
    throw err;
  }
}

// Delete Cabang
export async function deleteCabang(idCabang) {
  try {
    const response = await baseAxios.delete(`cabang/deleteCabang`, {
      headers: {
        token: localStorage.getItem("token"),
      },
      params: {
        idCabang: idCabang, // <--- dikirim lewat query
      },
    });

    return response.data;
  } catch (err) {
    console.error("Delete cabang error:", err);
    throw err;
  }
}
