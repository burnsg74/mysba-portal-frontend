import { createSlice } from '@reduxjs/toolkit';
import mock_data from "../api/mock_data.json"
const initialState = mock_data

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Define reducers here as needed, for example:
    addUser: (state, action) => {
      state.push(action.payload);
    },
    // ...other reducers like deleteUser, updateUser, etc.
  },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
