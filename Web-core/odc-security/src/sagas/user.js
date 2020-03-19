import { call, put, takeEvery } from "redux-saga/effects";
import { displayError, displayMsg, delay } from "odc-common";

import { CHANGE_PASSWORD } from "../constants/ActionTypes";

import {
  changePasswordSuccess,
  changePasswordFailure,
  clearRedirect
} from "../actions/user";

import * as securityUserComunication from "../communication/user";

import { showAlert } from "odc-common";

import * as messages from "./sagaMessages";

function* changePassword({ payload }) {
  try {
    const result = yield call(securityUserComunication.changePassword, payload);

    if (result.state) {
      yield put(changePasswordSuccess());
      yield call(delay, 300);
      yield put(clearRedirect());
      let msg = displayMsg("SEC008", messages);
      yield call(showAlert, msg);
    } else {
      yield put(changePasswordFailure());
      yield call(delay, 300);
      yield put(clearRedirect());
      yield call(showAlert, result.message);
    }
  } catch (error) {}
}

export function* watchChangePassword() {
  yield takeEvery(CHANGE_PASSWORD, changePassword);
}
