import { call, put, takeEvery } from "redux-saga/effects";
import { displayError, displayMsg } from "odc-common";

import {
  GET_ALL_PROFILES,
  GET_PROFILE,
  ADD_PROFILE,
  EDIT_PROFILE
} from "../constants/ActionTypes";

import {
  hideWindow,
  hideLoader,
  showLoader,
  getAllProfilesSuccess,
  loadProfile,
  addProfileSuccess,
  editProfileSuccess
} from "../actions/profile";

import * as securityProfileComunication from "../communication/profile";

import { showAlert } from "odc-common";
import * as messages from "./sagaMessages";

//**************PROFILES
//consulta PERFILES
function* getAllProfiles() {
  yield put(showLoader());
  try {
    const result = yield call(securityProfileComunication.getAllProfiles);
    if (result.state) {
      yield put(getAllProfilesSuccess(result.data));
      yield put(hideLoader());
    } else {
      yield put(hideLoader());
      let msg = displayError(result, messages);
      yield call(showAlert, msg);
    }
  } catch (error) {}
}

export function* watchgetAllProfiles() {
  yield takeEvery(GET_ALL_PROFILES, getAllProfiles);
}
function* getProfile(profile) {
  yield put(showLoader());
  try {
    const result = yield call(
      securityProfileComunication.getProfileById,
      profile.payload
    );
    if (result.state) {
      yield put(loadProfile(result.data));
      yield put(hideLoader());
    } else {
      yield put(hideLoader());
      let msg = displayError(result, messages);
      yield call(showAlert, msg);
    }
  } catch (error) {}
}

export function* watchgetProfile() {
  yield takeEvery(GET_PROFILE, getProfile);
}

function* addProfile(profile) {
  yield put(showLoader());
  try {
    const result = yield call(
      securityProfileComunication.addProfile,
      profile.payload
    );
    if (Number.isInteger(result.data)) {
      yield put(addProfileSuccess(profile.payload));
      yield put(hideLoader());

      let msg = displayMsg("GEN001", messages);
      yield put(hideWindow());
      yield call(showAlert, msg);
    } else {
      yield put(hideLoader());
      let msg = displayError(result.message, messages);
      yield call(showAlert, msg);
    }
  } catch (error) {}
}
//fetch de saga
export function* watchaddProfile() {
  yield takeEvery(ADD_PROFILE, addProfile);
}

//edicion de usuarios
function* editProfile(editProfile) {
  yield put(showLoader());
  try {
    const result = yield call(
      securityProfileComunication.editProfile,
      editProfile.payload
    );

    if (result.state) {
      yield put(editProfileSuccess(editProfile.payload, editProfile.index));
      yield put(hideLoader());

      let msg = displayMsg("GEN001", messages);
      yield put(hideWindow());
      yield call(showAlert, msg);
    } else {
      yield put(hideLoader());
      let msg = displayError(result.message, messages);
      yield call(showAlert, msg);
    }
  } catch (error) {}
}

//fetch de saga
export function* watcheditProfile() {
  yield takeEvery(EDIT_PROFILE, editProfile);
}
