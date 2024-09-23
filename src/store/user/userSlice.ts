import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const getUser = createSelector(
  (state: RootState) => state.user,
  user => user
);
export default userSlice.reducer;
