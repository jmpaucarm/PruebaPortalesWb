import {
  GET_ALL_MENUS_SUCCESS,
  EDIT_MENU_SUCCESS,
  ADD_MENU_SUCCESS
} from "../constants/ActionTypes";

import { updateItem, insertItem } from "odc-common";

const INIT_STATE = {
  rows: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_MENUS_SUCCESS: {
      return {
        ...state,
        rows: action.payload
      };
    }
    case EDIT_MENU_SUCCESS: {
      return {
        ...state,
        rows: updateItem(state.rows, {
          index: action.index,
          item: action.payload
        })
      };
    }
    case ADD_MENU_SUCCESS: {
      return {
        ...state,
        rows: insertItem(state.rows, {
          index: state.rows.length,
          item: action.payload
        })
      };
    }
    default:
      return state;
  }
};
