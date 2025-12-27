import { baseAxios } from "../index";

export async function createUser(data) {
  try {
    const response = await baseAxios.post("user/createuser", data, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    return response;
  } catch (err) {
    console.log("error upload", err);
  }
}

export async function getAllUser(dispatch, data, history) {
  try {
    const response = await baseAxios.get("user/getuser", {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    dispatch({ type: "SET_ALL_USER", data: response.data });
    console.log(response, "BERHASIL");
    return response;
  } catch (err) {
    console.log("error upload", err);
    return errorHandler(err.response);
  }
}

export async function updateUser(username, data) {
  if (!data) {
    return { error: true, message: "Data user tidak valid." };
  }

  try {
    const response = await baseAxios.patch(
      `user/updateuser?username=${encodeURIComponent(username)}`,
      data,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    console.log(response, "UPDATE BERHASIL");
    return response;
  } catch (err) {
    const errorMessage =
      err?.response?.data?.message || "Terjadi kesalahan saat mengupdate data.";
    return { error: true, message: errorMessage };
  }
}

export async function deleteUser(id) {
  try {
    const response = await baseAxios.delete(`user/deleteUser?id=${id}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });

    return response.data;
  } catch (err) {
    console.error("Delete user error:", err);
    throw err;
  }
}
