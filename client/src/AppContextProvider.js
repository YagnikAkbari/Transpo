import React, { createContext, useReducer } from "react";
import loginUserReducer from "./components/Reducer/loginUserReducer";
import {
  initialState,
  loaderRedFunc,
  loaderInit,
} from "./components/Reducer/loginUserReducer";

// const initialState = {
//   loginUser: {},
// };

const userReducer = function (state, dispatch) {};

const AppContextProvider = (props) => {
  // const [state, dispatch] = useReducer(loginUserReducer, initialState);
  // const [loaderState, loaderDispatch] = useReducer(loaderRedFunc, loaderInit);
  const [userState, dispatchUsertAction] = useReducer(
    userReducer,
    initialState
  );

  const loginUser = {
    loginUser: userState,
  };
  return (
    <userContext.Provider value={loginUser}>
      {props.children}
    </userContext.Provider>
  );
};

export default AppContextProvider;
export const userContext = createContext({
  loginUser: {},
});
