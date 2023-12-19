import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: { user: {} },
  reducers: {
    set_user: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { set_user } = userSlice.actions;
export default userSlice.reducer;