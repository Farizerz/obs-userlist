import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IToast {
  open: boolean;
  message: string;
}

const initialState: IToast = {
  open: false,
  message: "",
};

const toastSlice = createSlice({
  name: "toastSlice",
  initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

export const { setOpen, setMessage } = toastSlice.actions;
export default toastSlice.reducer;
