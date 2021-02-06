import { DashboardActionTypes } from "./dashboard.types";

const INITIAL_STATE = {
  option: "Profile",
}

const dashboardReducer = (state = INITIAL_STATE, action) => {
  //console.log("setCurrentUser reducer with", action)
  switch (action.type) {
    case DashboardActionTypes.SET_SELECTED_OPTION:
      //console.log("INSIDE setCurrentUser reducer with", action)
      return {
        ...state,
        option: action.payload
      };
    default:
      return state;
  }
};

export default dashboardReducer