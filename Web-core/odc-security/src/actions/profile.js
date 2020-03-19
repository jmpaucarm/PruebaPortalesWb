import {
  SHOW_WINDOW,
  HIDE_WINDOW,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  
  //*********PROFILE
  GET_ALL_PROFILES,
  GET_ALL_PROFILES_SUCCESS,
  
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  ADD_PROFILE,
  ADD_PROFILE_SUCCESS,
  EDIT_PROFILE,
  EDIT_PROFILE_SUCCESS,
  
  UPDATE_PROFILE_OPTIONS,
} from "../constants/ActionTypes";

export const hideLoader = () => {
  return {
    type: ON_HIDE_LOADER
  };
};

export const hideWindow = () => {
  return {
    type: HIDE_WINDOW
  };
};
export const showWindow = () => {
  return {
    type: SHOW_WINDOW
  };
};
export const showLoader = () => {
  return {
    type: ON_SHOW_LOADER
  };
};

//PROFILES
//OBTENER TODOS LOS PERFILES SAGA
export const getAllProfiles = () => {
  return {
    type: GET_ALL_PROFILES
  };
};
//OBTENER TODOS LOS USUARIOS REDUX
export const getAllProfilesSuccess = profiles => {
  return {
    type: GET_ALL_PROFILES_SUCCESS,
    payload: profiles
  };
};

export const getProfileById = id => {
  return {
    type: GET_PROFILE,
    payload: id
  };
};
export const loadProfile = profile => {
  return {
    type: GET_PROFILE_SUCCESS,
    payload: profile
  };
};

export const addProfile = profile => {
  return {
    type: ADD_PROFILE,
    payload: profile
  };
};

export const addProfileSuccess = profile => {
  return {
    type: ADD_PROFILE_SUCCESS,
    payload: profile
  };
};
export const editProfile = profile => {
  return {
    type: EDIT_PROFILE,
    payload: profile.payload,
    index: profile.index
  };
};
export const editProfileSuccess = (profile, index) => {
  return {
    type: EDIT_PROFILE_SUCCESS,
    payload: profile,
    index: index
  };
};

export const updateProfileOptions = options => {
  return {
    type: UPDATE_PROFILE_OPTIONS,
    payload: options
  };
};








