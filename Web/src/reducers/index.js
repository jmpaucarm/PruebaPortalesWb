import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducer as reduxFormReducer } from "redux-form";

import {
  alertReducer,
  authReducer,
  settingReducer,
  notificationReducer
} from "odc-common";

import Forms from "./forms";

import { reducer as workflowReducer } from "odc-workflow";
import { reducer as secReducer } from "odc-security";
import { reducer as confReducer } from "odc-configuration";

export default history =>
  combineReducers({
    router: connectRouter(history),
    settings: settingReducer,
    alert: alertReducer,
    auth: authReducer,
    notification: notificationReducer,
    workflow: workflowReducer,
    form: reduxFormReducer.plugin(Forms),
    security: secReducer,
    configuration: confReducer
  });
