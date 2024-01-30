import {createSelector, createSlice} from '@reduxjs/toolkit';
import {RootState} from "../store";

const initialState = {
  profile: {
    allow_notices: false,
    email: "cindysmith@spoonandharvest.com",
    first_name: "Cindy",
    id: 123,
    last_name: "Smith",
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.profile = action.payload;
    },
    clearUser: (state) => {
      state.profile = initialState.profile;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const getUser = createSelector(
  (state: RootState) => state.user,
  (user) => user
)
export default userSlice.reducer;
