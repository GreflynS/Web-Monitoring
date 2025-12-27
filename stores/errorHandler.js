import Swal from "sweetalert2";
export function errorHandler(err) {
  console.log(err, "<<<")

  if (err.status && err.status === 400) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err.data.message,
    }).then(() => {
      localStorage.removeItem("token");
      // window.location.replace("/auth/login-page");
    });
  } else if (err.response) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err.response.data.message,
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Periksa koneksi internet anda!",
    });
  }
}
