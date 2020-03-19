import {
  SHOW_WINDOW,
  HIDE_WINDOW,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  GET_ALL_PROFILES_SUCCESS,
  ADD_PROFILE_SUCCESS,
  EDIT_PROFILE_SUCCESS,
  GET_ALL_OPTIONS_SUCCESS
} from "../constants/ActionTypes";

import { insertItem, updateItem } from "odc-common";

const INIT_STATE = {
  rows: [],
  showProgressBar: false,
  openWindow: false,
  options: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SHOW_WINDOW: {
      return {
        ...state,
        openWindow: true
      };
    }
    case HIDE_WINDOW: {
      return {
        ...state,
        openWindow: false
      };
    }
    case ON_SHOW_LOADER: {
      return {
        ...state,
        showProgressBar: true
      };
    }
    case ON_HIDE_LOADER: {
      return {
        ...state,
        showProgressBar: false
      };
    }
    case GET_ALL_PROFILES_SUCCESS: {
      const temp = action.payload.map(profile => {
        return { ...profile, profileOptions: null };
      });

      return {
        ...state,
        rows: temp,
        showProgressBar: false
      };
    }
    case ADD_PROFILE_SUCCESS: {
      return {
        ...state,
        rows: insertItem(state.rows, {
          index: state.rows.length,
          item: action.payload
        }),
        showProgressBar: false
      };
    }
    case EDIT_PROFILE_SUCCESS: {
      return {
        ...state,
        rows: updateItem(state.rows, {
          index: action.index,
          item: action.payload
        }),
        showProgressBar: false
      };
    }
    case GET_ALL_OPTIONS_SUCCESS: {
      return {
        ...state,
        options: action.payload
      };
    }
    default:
      return state;
  }
};
