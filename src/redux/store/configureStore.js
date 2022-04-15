import thunk from "redux-thunk";
import logger from "redux-logger";
import { applyMiddleware, combineReducers, createStore } from "redux";
import {
  LoginAccount,
  RegisterAccount,
  RegisterSalon,
  ForgotPassword,
} from "../reducers/auth";
import {
  Booking,
  Salon,
  Service,
  Staff,
  StaffCalendar,
  HistoryBooking,
  Lis
} from "../reducers/booking";
import { SheduleCurent, SalonHistory, ListStaffSalon,ListService } from "../reducers/salon";
import { Profile } from "../reducers/profile";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

const loginConfig = {
  key: "loginAccount",
  storage: storageSession,
  blacklist: ["errMess"],
};

const bookingConfig = {
  key: "booking",
  storage: storageSession,
  blacklist: ["errMess"],
};

const rootReducer = combineReducers({
  loginAccount: persistReducer(loginConfig, LoginAccount),
  registerAccount: RegisterAccount,
  registerSalon: RegisterSalon,
  recoverAccount: ForgotPassword,
  salon: Salon,
  service: Service,
  staff: Staff,
  staffCalendar: StaffCalendar,
  booking: persistReducer(bookingConfig, Booking),
  historyBooking: HistoryBooking,
  profile: Profile,
  scheduleCurent: SheduleCurent,
  salonHistory: SalonHistory,
  listStaffSalon: ListStaffSalon,
  listServiceSalon:ListService
});

export const ConfigureStore = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk, logger));
  const persistor = persistStore(store);
  return { persistor, store };
};
