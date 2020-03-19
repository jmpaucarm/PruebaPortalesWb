import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Header, TopNav, Footer, Error404, asyncComponent } from "odc-common";
import Sidebar from "containers/common/SideNav/index";
import { settingRoutes } from "./routes/setting/routes";
import { profileRoutes } from "./routes/profile/routes";
import { securityRoutes } from "./routes/security/routes";
import { workflowRoutes } from "./routes/workflow/routes";
import { configurationRoutes } from "./routes/configuration/routes";
import { docConfigRoutes } from "./routes/docConfiguration/routes";
import { capacitacionRoutes } from "./routes/capacitacion/routes";


import {
  ABOVE_THE_HEADER,
  BELOW_THE_HEADER,
  COLLAPSED_DRAWER,
  FIXED_DRAWER,
  HORIZONTAL_NAVIGATION
} from "odc-common";
import { isIOS, isMobile } from "react-device-detect";

class App extends React.Component {
  render() {
    const {
      match,
      drawerType,
      navigationStyle,
      horizontalNavPosition
    } = this.props;
    const drawerStyle = drawerType.includes(FIXED_DRAWER)
      ? "fixed-drawer"
      : drawerType.includes(COLLAPSED_DRAWER)
      ? "collapsible-drawer"
      : "mini-drawer";

    //set default height and overflow for iOS mobile Safari 10+ support.
    if (isIOS && isMobile) {
      document.body.classList.add("ios-mobile-view-height");
    } else if (document.body.classList.contains("ios-mobile-view-height")) {
      document.body.classList.remove("ios-mobile-view-height");
    }

    const routes = [
      ...settingRoutes,
      ...profileRoutes,
      ...securityRoutes,
      ...workflowRoutes,
      ...configurationRoutes,
      ...docConfigRoutes,
      ...capacitacionRoutes
      
    ];

    return (
      <div className={`app-container ${drawerStyle}`}>
        <Sidebar />
        <div className="app-main-container">
          <div
            className={`app-header ${
              navigationStyle === HORIZONTAL_NAVIGATION
                ? "app-header-horizontal"
                : ""
            }`}
          >
            {navigationStyle === HORIZONTAL_NAVIGATION &&
              horizontalNavPosition === ABOVE_THE_HEADER && (
                <TopNav styleName="app-top-header" />
              )}
            <Header />
            {navigationStyle === HORIZONTAL_NAVIGATION &&
              horizontalNavPosition === BELOW_THE_HEADER && <TopNav />}
          </div>

          <main className="app-main-content-wrapper">
            <div className="app-main-content">
              <Switch>
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={`${match.url}${route.path}`}
                    component={asyncComponent(() => route.component)}
                  />
                ))}
                <Route
                   component={Error404}
                />
              </Switch>
            </div>
            <Footer />
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  const { drawerType, navigationStyle, horizontalNavPosition } = settings;
  return { drawerType, navigationStyle, horizontalNavPosition };
};
export default withRouter(connect(mapStateToProps)(App));
