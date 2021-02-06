import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"
import userReducer from "./user/user.reducer";
import dashboardReducer from "./dashboard/dashboard.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "dashboard"]
}

const rootReducer = combineReducers ({
  user: userReducer,
  dashboard: dashboardReducer,
})

export default persistReducer(persistConfig , rootReducer)