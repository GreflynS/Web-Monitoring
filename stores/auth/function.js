import { baseAxios, errorHandler } from "../index";
import Swal from "sweetalert2";
import routes from "../../routes";

function getRouting(routes, val) {
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].name === val) {
      return routes[i].layout + routes[i].path;
    }
    if (routes[i].collapse) {
      return getRouting(routes[i].views, val);
    }
  }
  return "/";
}

export function login(dispatch, data, history) {
  Swal.fire({
    title: "Loading...",
    didOpen() {
      Swal.showLoading();
    },
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false,
  });

  baseAxios
    .post("/user/loginweb", data)
    .then(async (respon) => {
      let {
        username,
        idClient,
        idCabang,
        nama,
        role,
        menu,
        perusahaan,
        token,
      } = respon.data;

      Swal.close();

      // SIMPAN TOKEN & NAMA
      localStorage.setItem("token", token);
      localStorage.setItem("nama", nama);

      dispatch({
        type: "SET_IDENTITY",
        data: {
          username,
          idClient,
          idCabang,
          nama,
          role,
          menu,
          perusahaan,
        },
      });

      history.push("/admin/dashboard");
    })
    .catch((err) => {
      errorHandler(err.response);
    });
}

export function refresh(dispatch) {
  // Swal.fire({
  //   title: "Tunggu ...",
  //   didOpen() {
  //     Swal.showLoading();
  //   },
  //   allowOutsideClick: false,
  //   allowEscapeKey: false,
  //   allowEnterKey: false,
  // });

  baseAxios
    .get("/user/refresh", {
      headers: { token: localStorage.getItem("token") },
    })
    .then(async (respon) => {
      let {
        username,
        idClient,
        idCabang,
        nama,
        role,
        menu,
        perusahaan,
        token,
      } = respon.data;

      // simpan token BARU dan nama BARU
      localStorage.setItem("token", token);
      localStorage.setItem("nama", nama);

      dispatch({
        type: "SET_IDENTITY",
        data: {
          username,
          idClient,
          idCabang,
          nama,
          role,
          menu,
          perusahaan,
        },
      });

      Swal.close();
    })
    .catch(errorHandler);
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("nama"); // <— PENTING!
  window.location.replace("/auth/login-page");
}
