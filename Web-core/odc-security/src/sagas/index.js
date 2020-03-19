import { all, fork } from "redux-saga/effects";

import { watchChangePassword } from "./user";

import {
  watchgetAllProfiles,
  watchgetProfile,
  watchaddProfile,
  watcheditProfile
} from "./profile";

import {
  watchgetgetAllMenus,
  watchgeteditMenu,
  watchgetaddMenu,
  watchgetgetAllOptions,
  watchgetgetAllMenuScreens
} from "./menu";

export default function* rootSaga() {
  yield all([
    fork(watchgetAllProfiles),
    fork(watchChangePassword),
    fork(watchgetProfile),
    fork(watchaddProfile),
    fork(watcheditProfile),
    fork(watchgetgetAllMenuScreens),
    fork(watchgetgetAllMenus),
    fork(watchgeteditMenu),
    fork(watchgetaddMenu),
    fork(watchgetgetAllOptions)
  ]);
}
