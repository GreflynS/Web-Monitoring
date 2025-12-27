import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({ children, ...rest }) {
  let token = localStorage.getItem("token");
  // console.log(token, 'XXXXXX')

  // let token = true

  return (
    <Route {...rest}>
      {!token ? <Redirect to={"/auth/login-page"} /> : children}
      {/* {token ? <Redirect to={"/admin/dashboards"} /> : children} */}
    </Route>
  );
}
