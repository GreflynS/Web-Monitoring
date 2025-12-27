import axios from "axios";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";

// reducer
import authReducer from "./auth";
import dashboardReducer from "./dashboard";
import monitoringReducer from "./monitoring";
import userReducer from "./User";
import clientReducer from "./Client";
import cabangReducer from "./Cabang";
import ruanganReducer from "./Ruangan";
import visitReducer from "./Visit";
import shiftReducer from "./Shift";
import trainingReducer from "./Training";
import patrolReducer from "./Patrol";
import grafikTrainingReducer from "./Training";
import grafikVisitReducer from "./Visit";

// function
export * from "./auth/function";
export * from "./monitoring/function";
export * from "./errorHandler";
export * from "./Patrol/function";
export * from "./Cabang/function";
export * from "./Client/function";
export * from "./User/function";
export * from "./Ruangan/function";
export * from "./Visit/function";
export * from "./Training/function";
export * from "./Shift/function";

// server api
// export const baseUrl = process.env.REACT_APP_URL
// export const baseUrl = "http://192.168.110.185:9030/";
// export const baseUrl = "https://s0z1w6cq-9030.asse.devtunnels.ms/";
export const baseUrl = "https://cdlzk6qw-9030.asse.devtunnels.ms/";
// export const baseUrl = "https://s3t90h15-9030.asse.devtunnels.ms/";
// export const baseUrl = "http://192.168.110.213:9030/";
// export const baseUrl = "http://localhost:9030/";

export const baseAxios = axios.create({
  baseURL: baseUrl,
  // timeout: 10000,
});

const rootReducer = combineReducers({
  authReducer,
  dashboardReducer,
  monitoringReducer,
  userReducer,
  clientReducer,
  cabangReducer,
  ruanganReducer,
  visitReducer,
  shiftReducer,
  trainingReducer,
  patrolReducer,
  // grafikTrainingReducer,
  // grafikVisitReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
