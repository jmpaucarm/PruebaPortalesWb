import * as SecurityActionTypes from "../../constants/ActionTypes";

export default {
  UserForm: (state, action) => {
    switch (action.type) {
      default:
        return state;
    }
  },
  ProfileForm: (state, action) => {
    switch (action.type) {
      case SecurityActionTypes.GET_PROFILE_SUCCESS: {
        return {
          ...state,
          values: action.payload
        };
      }

      case SecurityActionTypes.UPDATE_PROFILE_OPTIONS: {
        return {
          ...state,
          values: {
            ...state.values,
            profileOption: action.payload
          }
        };
      }

      default:
        return state;
    }
  }
};
