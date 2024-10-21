import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  email: "",
  phone: "",
  address: "",
  //avatar: "",
  access_token: "",
  //refreshToken: ''
  isAdmin: false
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        _id = "",
        name = "",
        email = "",
        access_token = "",
        phone = "",
        address = "",
        isAdmin = ""
        //avatar = "",
      } = action.payload;
      state.id = _id;
      state.name = name;
      state.email = email;
      state.phone = phone;
      state.address = address;
      //state.avatar = avatar;
      state.access_token = access_token;
      state.isAdmin = isAdmin;
      //state.refreshToken = refreshToken
    },
    resetUser: (state) => {
      //const { name, email, access_token, refreshToken } = action;
      state.id = "";
      state.name = "";
      state.email = "";
      state.phone = "";
      state.address = "";
      //state.avatar = "";
      state.access_token = "";
      state.isAdmin = "";
      //state.refreshToken = refreshToken
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
