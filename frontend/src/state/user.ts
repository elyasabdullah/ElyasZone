import { createSlice } from "@reduxjs/toolkit"
import Cookies from "js-cookie";

interface IintialState {
  username: string,
  _id: string,
  accessToken: string | null,
  isAuthenticated: boolean
}
const userInfoStorage  = localStorage.getItem('user');

let userInfo: {username: string, _id: string};

if(userInfoStorage) {
  userInfo = JSON.parse(userInfoStorage);
}else {
  userInfo = {username: "", _id: ""}
}
const initialState: IintialState = {
  username: userInfo.username || '',
  _id: userInfo._id || '',
  accessToken: Cookies.get('accessToken') || null,
  isAuthenticated: Cookies.get('accessToken') ? true : false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.username = "";
      state._id = ""
      Cookies.remove("accessToken");
    },
    setTokens: (state, action) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
    },
    setUser: (state, action) => {
      state.username = action.payload.username;
      state._id = action.payload._id
      state.isAuthenticated = action.payload.isAuthenticated || false;
      state.accessToken = action.payload.accessToken || null;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload
    },
  }
})

export const { logout, setTokens, setUser, setAuthenticated } = userSlice.actions;
export default userSlice.reducer;
