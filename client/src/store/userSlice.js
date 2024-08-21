import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      uname: "",
      orders: [],
      replies: [],
      userType: "",
      phone: "",
      vehicleId: "",
      adress: "",
      toasterData: {
        type: "",
        message: "",
      },
    },
  },
  reducers: {
    addUser(state, action) {
      state.user = action.payload;
    },
    getToaster(state, action) {
      state.toasterData = {
        type: action.payload.type,
        message: action.payload.message,
      };
    },
  },
});

export const getUser = (config) => {
  return async (dispatch) => {
    const getUserData = async () => {
      const res = await fetch(config.url, {
        method: config.method,
        headers: config.headers,
      });

      if (!res.ok) {
        throw new Error("User not Fetched!");
      }

      const data = await res.json();
      return data;
    };
    try {
      let user = await getUserData();

      if (user.userType === "MANUFACTURER") {
        user = {
          uname: user.uname,
          phone: user.phone,
          address: user.address,
          userType: user.userType,
          replies: user.repelies,
        };
      }
      if (user.userType === "TRANSPORTER") {
        user = {
          uname: user.uname,
          phone: user.phone,
          vehicleId: user.vehicleId,
          userType: user.userType,
          orders: user.orders,
        };
      }
      dispatch(userActions.addUser(user));
    } catch (err) {
      console.log(err);
    }
  };
};

export const userActions = userSlice.actions;

export default userSlice.reducer;
