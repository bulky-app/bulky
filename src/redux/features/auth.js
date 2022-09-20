import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    active: false,
  },
  reducers: {
    toggleActive: (state) => {
      state.active = !state.active;
    },
  },
});
export const { toggleActive } = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
