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
        _id = state.id,
        name = state.name,
        email = state.email,
        access_token = state.access_token,
        phone = state.phone,
        address = state.address,
        isAdmin = state.isAdmin,
        //avatar = state.avatar,
      } = action.payload;

      // Cập nhật state với giá trị mới, nếu không có giá trị mới, giữ lại giá trị cũ
      state.id = _id;
      state.name = name;
      state.email = email;
      state.phone = phone;
      state.address = address;
      //state.avatar = avatar;
      state.access_token = access_token;
      state.isAdmin = isAdmin;
    },
    resetUser: (state) => {
      // Đặt lại tất cả các giá trị về giá trị ban đầu
      state.id = "";
      state.name = "";
      state.email = "";
      state.phone = "";
      state.address = "";
      //state.avatar = "";
      state.access_token = "";
      state.isAdmin = false;
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
