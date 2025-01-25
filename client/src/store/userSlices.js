import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user:null,
};
export const userSlices = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlices.actions;

export default userSlices.reducer;