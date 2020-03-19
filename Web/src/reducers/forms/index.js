import demoFormReducer from "./demo";
import { formReducer as secFormReducer } from "odc-security";
import { formReducer as confFormReducer } from "odc-configuration";

export default {
  ...demoFormReducer,
  ...secFormReducer,
  ...confFormReducer
};
