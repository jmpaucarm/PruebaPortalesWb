import { call, put, takeEvery } from "redux-saga/effects";

import { displayError, displayMsg } from "odc-common";

import {
  GET_ALL_MENUS,
  EDIT_MENU,
  ADD_MENU,
  GET_ALL_OPTIONS,
  GET_ALL_MENU_SCREENS
} from "../constants/ActionTypes";

import {
  getAllMenusSuccess,
  editMenuSuccess,
  addMenuSuccess,
  getAllOptionsSuccess,
  getAllMenuScreensSuccess
} from "../actions/menu";

import * as securityMenuComunication from "../communication/menu";
import { showAlert } from "odc-common";
import * as messages from "./sagaMessages";

function* getAllMenus() {
  try {
    const result = yield call(securityMenuComunication.getAllMenus);
    if (result.state) yield put(getAllMenusSuccess(result.data));
  } catch (error) {
    let msg = displayError(error, messages);
    yield call(showAlert, msg);
  }
}

export function* watchgetgetAllMenus() {
  yield takeEvery(GET_ALL_MENUS, getAllMenus);
}

function* editMenu(editMenu) {
  try {
    yield call(securityMenuComunication.editMenu, editMenu.payload);
    yield put(editMenuSuccess(editMenu.payload, editMenu.index));
    let msg = displayMsg("GEN001", messages);
    yield call(showAlert, msg);
  } catch (error) {
    let msg = displayError(error, messages);
    yield call(showAlert, msg);
  }
}

export function* watchgeteditMenu() {
  yield takeEvery(EDIT_MENU, editMenu);
}

function* addMenu(menu) {
  try {
    yield call(securityMenuComunication.addMenu, menu.payload);
    yield put(addMenuSuccess(menu.payload));
    let msg = displayMsg("GEN001", messages);
    yield call(showAlert, msg);
  } catch (error) {
    let msg = displayError(error, messages);
    yield call(showAlert, msg);
  }
}

export function* watchgetaddMenu() {
  yield takeEvery(ADD_MENU, addMenu);
}

function* getAllOptions() {
  try {
    const result = yield call(securityMenuComunication.getAllOptions);
    if (result.state) yield put(getAllOptionsSuccess(result.data));
  } catch (error) {
    let msg = displayError(error, messages);
    yield call(showAlert, msg);
  }
}

export function* watchgetgetAllOptions() {
  yield takeEvery(GET_ALL_OPTIONS, getAllOptions);
}

function* getAllMenuScreens() {
  try {
    const result = yield call(securityMenuComunication.getAllMenuScreens);
    if (result.state) yield put(getAllMenuScreensSuccess(result.date));
  } catch (error) {
    let msg = displayError(error, messages);
    yield call(showAlert, msg);
  }
}

export function* watchgetgetAllMenuScreens() {
  yield takeEvery(GET_ALL_MENU_SCREENS, getAllMenuScreens);
}
