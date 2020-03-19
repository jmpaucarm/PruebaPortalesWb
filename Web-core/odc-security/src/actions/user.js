import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  CLEAR_REDIRECT
} from "../constants/ActionTypes";


export const changePassword = data => {
  return {
    type: CHANGE_PASSWORD,
    payload: data
  };
};
export const changePasswordSuccess = () => {
  return {
    type: CHANGE_PASSWORD_SUCCESS
  };
};
export const changePasswordFailure = () => {
  return {
    type: CHANGE_PASSWORD_FAILURE
  };
};

export const clearRedirect = () => {
  return {
    type: CLEAR_REDIRECT
  };
};
