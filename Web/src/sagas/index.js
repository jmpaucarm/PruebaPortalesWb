import { all } from "redux-saga/effects";
import authSaga from "./common/Auth";
import { commonSaga } from "odc-common";
import { saga as workflowSaga } from "odc-workflow";
import { saga as secSaga } from "odc-security";
import { saga as confSaga } from "odc-configuration";

export default function* rootSaga(getState) {
  yield all([authSaga(), commonSaga(), workflowSaga(), secSaga(), confSaga()]);
}
