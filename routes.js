// import Dashboard from "views/Dashboard.js";
import Buttons from "views/Components/Buttons.js";
import GridSystem from "views/Components/GridSystem.js";
import Panels from "views/Components/Panels.js";
import SweetAlert from "views/Components/SweetAlertPage.js";
import Notifications from "views/Components/Notifications.js";
import Icons from "views/Components/Icons.js";
import Typography from "views/Components/Typography.js";
import RegularForms from "views/Forms/RegularForms.js";
import ExtendedForms from "views/Forms/ExtendedForms.js";
import ValidationForms from "views/Forms/ValidationForms.js";
import Wizard from "views/Forms/Wizard/Wizard.js";
import RegularTables from "views/Tables/RegularTables.js";
import ExtendedTables from "views/Tables/ExtendedTables.js";
import ReactTables from "views/Tables/ReactTables.js";
import GoogleMaps from "views/Maps/GoogleMaps.js";
import FullScreenMap from "views/Maps/FullScreenMap.js";
import VectorMap from "views/Maps/VectorMap.js";
import Charts from "views/Charts.js";
import Calendar from "views/Calendar.js";
import UserPage from "views/Pages/UserPage.js";

import LoginPageNew from "views/Pages/LoginPageNew";
import Dashboard from "views/Pages/Dashboard.js";
import User from "views/Pages/User/User";
import Resume from "./Resume";
import Ruangan from "views/Pages/Ruangan/Ruangan";
import Client from "views/Pages/Client/Client";
import Cabang from "views/Pages/Cabang/Cabang";
import Visit from "views/Pages/Visit/Visit";
import Shift from "views/Pages/Shift/Shift";
import Training from "views/Pages/Training/Training";
import Patrol from "views/Pages/Patrol/Patrol";
// import GrafikTraining from "views/Pages/Training/GrafikTraining";
// import GrafikVisit from "views/Pages/Visit/GrafikVisit";

var routes = [
  {
    show: true,
    path: "/dashboard",
    layout: "/admin",
    name: "Dashboard",
    icon: "fa fa-columns",
    component: Dashboard,
  },
  {
    show: true,
    path: "/user",
    layout: "/admin",
    name: "User",
    icon: "fa fa-users",
    iconColor: "#2e72f5",
    component: User,
  },

  // {
  // show: true,
  // collapse: true,
  // path: "/cabang",
  // name: "Branch",
  // state: "openCabang",
  // icon: "nc-icon nc-bank",
  // views: [
  {
    show: true,
    path: "/client",
    layout: "/admin",
    name: "Staff",
    icon: "fa fa-user-tie",
    iconColor: "#2e72f5",
    component: Client,
  },
  {
    show: true,
    path: "/cabang",
    layout: "/admin",
    name: "Branch",
    icon: "fa fa-building",
    component: Cabang,
  },
  {
    show: true,
    path: "/ruangan",
    layout: "/admin",
    name: "Room",
    icon: "fa fa-door-open",
    component: Ruangan,
  },
  {
    show: true,
    path: "/shift",
    layout: "/admin",
    name: "Shift",
    icon: "fa fa-clock",
    component: Shift,
  },
  // ],
  // },
  {
    show: true,
    collapse: true,
    path: "/patroli",
    name: "Report",
    state: "openPatroli",
    icon: "fa fa-clipboard-list",
    views: [
      {
        show: true,
        path: "/patrol",
        layout: "/admin",
        name: "Patrol",
        icon: "fa fa-shield-alt",
        component: Patrol,
      },
      {
        show: true,
        path: "/visit",
        layout: "/admin",
        name: "Visit",
        icon: "fa fa-route",
        component: Visit,
      },
      {
        show: true,
        path: "/training",
        layout: "/admin",
        name: "Training",
        icon: "fa fa-chalkboard-teacher",
        component: Training,
      },
    ],
  },

  // {
  //   show: true,
  //   path: "/dashboard",
  //   layout: "/admin",
  //   name: "Dashboard",
  //   icon: "nc-icon nc-chart-pie-35",
  //   component: Dashboard,
  // },
  // {
  //   show: true,
  //   path: "/resume",
  //   layout: "/admin",
  //   name: "Resume",
  //   icon: "nc-icon nc-chart-pie-35",
  //   component: Resume,
  // },

  // {
  //   show: true,
  //   collapse: true,
  //   path: "/components",
  //   name: "Components",
  //   state: "openComponents",
  //   icon: "nc-icon nc-app",
  //   views: [
  //     {
  //       show: true,
  //       path: "/buttons",
  //       layout: "/admin",
  //       name: "Buttons",
  //       mini: "B",
  //       component: Buttons,
  //     },
  //     {
  //       show: true,
  //       path: "/grid-system",
  //       layout: "/admin",
  //       name: "Grid System",
  //       mini: "GS",
  //       component: GridSystem,
  //     },
  //     {
  //       show: true,
  //       path: "/panels",
  //       layout: "/admin",
  //       name: "Panels",
  //       mini: "P",
  //       component: Panels,
  //     },
  //     {
  //       show: true,
  //       path: "/sweet-alert",
  //       layout: "/admin",
  //       name: "Sweet Alert",
  //       mini: "SA",
  //       component: SweetAlert,
  //     },
  //     {
  //       show: true,
  //       path: "/notifications",
  //       layout: "/admin",
  //       name: "Notifications",
  //       mini: "N",
  //       component: Notifications,
  //     },
  //     {
  //       show: true,
  //       path: "/icons",
  //       layout: "/admin",
  //       name: "Icons",
  //       mini: "I",
  //       component: Icons,
  //     },
  //     {
  //       show: true,
  //       path: "/typography",
  //       layout: "/admin",
  //       name: "Typography",
  //       mini: "T",
  //       component: Typography,
  //     },
  //   ],
  // },
  // {
  //   show: true,
  //   collapse: true,
  //   path: "/forms",
  //   name: "Forms",
  //   state: "openForms",
  //   icon: "nc-icon nc-notes",
  //   views: [
  //     {
  //       show: true,
  //       path: "/regular-forms",
  //       layout: "/admin",
  //       name: "Regular Forms",
  //       mini: "RF",
  //       component: RegularForms,
  //     },
  //     {
  //       show: true,
  //       path: "/extended-forms",
  //       layout: "/admin",
  //       name: "Extended Forms",
  //       mini: "EF",
  //       component: ExtendedForms,
  //     },
  //     {
  //       show: true,
  //       path: "/validation-forms",
  //       layout: "/admin",
  //       name: "Validation Forms",
  //       mini: "VF",
  //       component: ValidationForms,
  //     },
  //     {
  //       show: true,
  //       path: "/wizard",
  //       layout: "/admin",
  //       name: "Wizard",
  //       mini: "W",
  //       component: Wizard,
  //     },
  //   ],
  // },
  // {
  //   show: true,
  //   collapse: true,
  //   path: "/tables",
  //   name: "Tables",
  //   state: "openTables",
  //   icon: "nc-icon nc-paper-2",
  //   views: [
  //     {
  //       show: true,
  //       path: "/regular-tables",
  //       layout: "/admin",
  //       name: "Regular Tables",
  //       mini: "RT",
  //       component: RegularTables,
  //     },
  //     {
  //       show: true,
  //       path: "/extended-tables",
  //       layout: "/admin",
  //       name: "Extended Tables",
  //       mini: "ET",
  //       component: ExtendedTables,
  //     },
  //     {
  //       show: true,
  //       path: "/react-table",
  //       layout: "/admin",
  //       name: "React Table",
  //       mini: "RT",
  //       component: ReactTables,
  //     },
  //   ],
  // },
  // {
  //   show: true,
  //   collapse: true,
  //   path: "/maps",
  //   name: "Maps",
  //   state: "openMaps",
  //   icon: "nc-icon nc-pin-3",
  //   views: [
  //     {
  //       show: true,
  //       path: "/google-maps",
  //       layout: "/admin",
  //       name: "Google Maps",
  //       mini: "GM",
  //       component: GoogleMaps,
  //     },
  //     {
  //       show: true,
  //       path: "/full-screen-maps",
  //       layout: "/admin",
  //       name: "Full Screen Map",
  //       mini: "FSM",
  //       component: FullScreenMap,
  //     },
  //     {
  //       show: true,
  //       path: "/vector-maps",
  //       layout: "/admin",
  //       name: "Vector Map",
  //       mini: "VM",
  //       component: VectorMap,
  //     },
  //   ],
  // },
  // {
  //   show: true,
  //   path: "/charts",
  //   layout: "/admin",
  //   name: "Charts",
  //   icon: "nc-icon nc-chart-bar-32",
  //   component: Charts,
  // },
  // {
  //   show: true,
  //   path: "/calendar",
  //   layout: "/admin",
  //   name: "Calendar",
  //   icon: "nc-icon nc-single-copy-04",
  //   component: Calendar,
  // },
  {
    show: false,
    collapse: true,
    path: "/pages",
    name: "Pages",
    state: "openPages",
    icon: "nc-icon nc-puzzle-10",
    views: [
      {
        path: "/user-page",
        layout: "/admin",
        name: "User Page",
        mini: "UP",
        component: UserPage,
      },
      {
        show: false,
        path: "/login-page",
        layout: "/auth",
        name: "Login Page",
        mini: "LP",
        component: LoginPageNew,
      },
    ],
  },
];
export default routes;
