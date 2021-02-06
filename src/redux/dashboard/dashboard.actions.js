import { DashboardActionTypes } from "./dashboard.types";

export const setSelectedOption = option => {
  return({
  type: DashboardActionTypes.SET_SELECTED_OPTION,
  payload: option
})};