import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "assets/scss/light-bootstrap-dashboard-pro-react.scss?v=2.0.0";
import "assets/css/demo.css";

import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import ProtectedRoute from "ProtectedRoute";

import { Provider } from "react-redux";
import { store } from "./stores/index";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Switch>
        <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
        <ProtectedRoute
          path="/admin"
          render={(props) => <AdminLayout {...props} />}
        />
        <Redirect from="/" to="/admin/dashboards" />
      </Switch>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
