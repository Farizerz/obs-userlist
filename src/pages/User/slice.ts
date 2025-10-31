import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IUser, IUsers } from "@/types/user";

export const initialDetails = {
  id: 0,
  name: "",
  username: "",
  email: "",
  address: {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    geo: {
      lat: "",
      lng: "",
    },
  },
  phone: "",
  website: "",
  company: {
    name: "",
    catchPhrase: "",
    bs: "",
  },
  picture: "",
};

const initialState: IUsers = {
  total: 0,
  users: [],
  userDetail: initialDetails,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    setUsers: (state, action: PayloadAction<IUser[]>) => {
      state.users = action.payload;
    },
    setUserDetail: (state, action: PayloadAction<IUser>) => {
      state.userDetail = action.payload;
    },
  },
});

export const { setTotal, setUsers, setUserDetail } = userSlice.actions;
export default userSlice.reducer;
