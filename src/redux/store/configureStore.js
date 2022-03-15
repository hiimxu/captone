import thunk from "redux-thunk";
import logger from "redux-logger";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { LoginAccount, RegisterAccount } from "../reducers/auth";
import { Booking, Salon, Service, Staff } from "../reducers/booking";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

const loginConfig = {
  key: "loginAccount",
  storage: storageSession,
  blacklist: ["errMess"],
};

const rootReducer = combineReducers({
  loginAccount: persistReducer(loginConfig, LoginAccount),
  registerAccount: RegisterAccount,
  salon: Salon,
  service: Service,
  staff: Staff,
  booking: Booking,
});

export const ConfigureStore = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk, logger));
  const persistor = persistStore(store);
  return { persistor, store };
};
