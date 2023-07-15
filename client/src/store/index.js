import { configureStore } from "@reduxjs/toolkit";

import AuthReducer from "./authSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: { auth: AuthReducer, user: userReducer },
});

export default store;
