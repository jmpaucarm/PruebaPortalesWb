import {
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  CLEAR_REDIRECT
} from "../constants/ActionTypes";

import { insertItem, updateItem } from "odc-common";

const INIT_STATE = {
  rows: [],
  showProgressBar: true,
  profiles: [],
  openWindow: false,
  redirect: ""
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        redirect: "/app/security/user"
      };
    }

    case CHANGE_PASSWORD_FAILURE: {
      return {
        ...state,
        redirect: "/app/security/user"
      };
    }
    case CLEAR_REDIRECT: {
      return {
        ...state,
        redirect: ""
      };
    }

    default:
      return state;
  }
};
