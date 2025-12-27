import { baseAxios } from "../index";

// ========================
// CREATE CLIENT
// ========================
export async function createClient(data) {
  try {
    const response = await baseAxios.post("client/createclient", data, {
      headers: { token: localStorage.getItem("token") },
    });
    return response;
  } catch (err) {
    console.error("Create client error:", err);
    throw err;
  }
}

// ========================
// GET ALL CLIENT
// ========================
export async function getAllClient(dispatch) {
  try {
    const response = await baseAxios.get("client/getclient", {
      headers: { token: localStorage.getItem("token") },
    });
    dispatch({ type: "SET_ALL_CLIENT", data: response.data });
    return response;
  } catch (err) {
    console.error("Get client error:", err);
    throw err;
  }
}

// ========================
// UPDATE CLIENT
// ========================
export async function updateClient(idClient, data) {
  try {
    const response = await baseAxios.patch(
      `client/updateclient?idClient=${idClient}`,
      data,
      { headers: { token: localStorage.getItem("token") } }
    );
    return response;
  } catch (err) {
    console.error("Update client error:", err.response || err);
    throw err;
  }
}

// ========================
// DELETE CLIENT
// ========================
export async function deleteClient(idClient) {
  try {
    const response = await baseAxios.delete(
      `client/deleteclient?idClient=${idClient}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    return response.data; // Akan berisi message dan data
  } catch (err) {
    console.error("Delete client error:", err);
    throw err;
  }
}
