import React from "react";
import "./Sidebar.css";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Collapse, Nav } from "react-bootstrap";

// Import gambar
import logoPic from "assets/img/apple-icon.png";
import defaultProfilePic from "views/Pages/BackgroundBAP.jpg";

function Sidebar({ routes, image, background }) {
  const auth = useSelector((state) => state.authReducer);
  const location = useLocation();

  const [userCollapseState, setUserCollapseState] = React.useState(false);
  const [state, setState] = React.useState({});

  React.useEffect(() => {
    setState(getCollapseStates(routes));
  }, [routes]);

  const getCollapseStates = (routes) => {
    let initialState = {};
    routes.forEach((prop) => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: getCollapseInitialState(prop.views),
          ...getCollapseStates(prop.views),
          ...initialState,
        };
      }
    });
    return initialState;
  };

  const getCollapseInitialState = (routes) => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && getCollapseInitialState(routes[i].views)) {
        return true;
      } else if (location.pathname === routes[i].layout + routes[i].path) {
        return true;
      }
    }
    return false;
  };

  const createLinks = (routes) => {
    return routes.map((prop, key) => {
      if (prop.redirect || !prop.show) return null;

      if (prop.collapse) {
        const st = { [prop.state]: !state[prop.state] };
        return (
          <Nav.Item
            className={getCollapseInitialState(prop.views) ? "active" : ""}
            as="li"
            key={key}
          >
            <Nav.Link
              className={state[prop.state] ? "collapsed" : ""}
              onClick={(e) => {
                e.preventDefault();
                setState({ ...state, ...st });
              }}
              aria-expanded={state[prop.state]}
            >
              {prop.icon && <i className={prop.icon}></i>}
              <p>
                {prop.name} <b className="caret"></b>
              </p>
            </Nav.Link>
            <Collapse in={state[prop.state]}>
              <div>
                <Nav as="ul">{createLinks(prop.views)}</Nav>
              </div>
            </Collapse>
          </Nav.Item>
        );
      }

      return (
        <Nav.Item
          className={activeRoute(prop.layout + prop.path)}
          key={key}
          as="li"
        >
          <Nav.Link as={Link} to={prop.layout + prop.path}>
            {prop.icon ? (
              <>
                <i className={prop.icon} />
                <p>{prop.name}</p>
              </>
            ) : (
              <>
                <span className="sidebar-mini">{prop.mini}</span>
                <span className="sidebar-normal">{prop.name}</span>
              </>
            )}
          </Nav.Link>
        </Nav.Item>
      );
    });
  };

  const activeRoute = (routeName) =>
    location.pathname === routeName ? "active" : "";

  console.log("AUTH REDUX:", auth);
  // console.log("DATA LOGIN DARI API:", data);

  return (
    <div className="sidebar" data-color={background} data-image={image}>
      <div className="sidebar-wrapper premium-sidebar">
        {/* Logo */}
        <div className="logo">
          <div className="logo-img">
            <img
              src={logoPic}
              alt="react-logo"
              style={{ width: 30, height: 30 }}
            />
          </div>
          {/* <div className="logo-normal" style={{ textTransform: "none" }}>
            PT Bina Area Persada
          </div> */}
        </div>

        {/* Sidebar menu */}
        <Nav as="ul">{createLinks(routes)}</Nav>
      </div>

      <div
        className="sidebar-background"
        style={{ backgroundImage: `url('${image}')` }}
      ></div>
    </div>
  );
}

const linkPropTypes = {
  path: PropTypes.string,
  layout: PropTypes.string,
  name: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
};

Sidebar.defaultProps = {
  image: "",
  background: "black",
  routes: [],
};

Sidebar.propTypes = {
  image: PropTypes.string,
  background: PropTypes.oneOf([
    "black",
    "azure",
    "green",
    "orange",
    "red",
    "purple",
  ]),
  routes: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({ ...linkPropTypes, icon: PropTypes.string }),
      PropTypes.shape({
        show: PropTypes.bool,
        collapse: true,
        path: PropTypes.string,
        name: PropTypes.string,
        state: PropTypes.string,
        icon: PropTypes.string,
        views: PropTypes.arrayOf(
          PropTypes.shape({ ...linkPropTypes, mini: PropTypes.string })
        ),
      }),
    ])
  ),
};

export default Sidebar;
