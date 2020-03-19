import {
  GET_ALL_MENUS,
  GET_ALL_MENUS_SUCCESS,
  EDIT_MENU,
  EDIT_MENU_SUCCESS,
  ADD_MENU,
  ADD_MENU_SUCCESS,
  GET_ALL_OPTIONS,
  GET_ALL_OPTIONS_SUCCESS,
  GET_ALL_MENU_SCREENS,
  GET_ALL_MENU_SCREENS_SUCCESS,

} from "../constants/ActionTypes";

export const getAllMenuScreens = () => {
  return {
    type: GET_ALL_MENU_SCREENS
  };
};
export const getAllMenuScreensSuccess = menu => {
  return {
    type: GET_ALL_MENU_SCREENS_SUCCESS,
    payload: menu
  };
};

export const getAllMenus = () => {
  return {
    type: GET_ALL_MENUS
  };
};
export const getAllMenusSuccess = rows => {
  return {
    type: GET_ALL_MENUS_SUCCESS,
    payload: rows
  };
};
export const editMenu = menu => {
  return {
    type: EDIT_MENU,
    payload: menu.payload,
    index: menu.index
  };
};
export const editMenuSuccess = (menu, index) => {
  return {
    type: EDIT_MENU_SUCCESS,
    payload: menu,
    index: index
  };
};
export const addMenu = menu => {
  return {
    type: ADD_MENU,
    payload: menu
  };
};
export const addMenuSuccess = menu => {
  return {
    type: ADD_MENU_SUCCESS,
    payload: menu
  };
};
export const getAllOptions = () => {
  return {
    type: GET_ALL_OPTIONS
  };
};
export const getAllOptionsSuccess = options => {
  return {
    type: GET_ALL_OPTIONS_SUCCESS,
    payload: options
  };
};


