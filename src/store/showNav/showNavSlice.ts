import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type NavState = {
  value: boolean;
  showProfile: boolean;
};

const initialState: NavState = {
  value: true,
  showProfile: true,
};

export const showNavSlice = createSlice({
  name: 'showNav',
  initialState,
  reducers: {
    setNav: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
    setShowProfile: (state, action: PayloadAction<boolean>) => {
      state.showProfile = action.payload;
    },
  },
});

export const { setNav, setShowProfile } = showNavSlice.actions;

// Selector for value
export const getShowNav = createSelector(
  (state: RootState) => state.showNav.value,
  showNav => showNav
);

// Selector for showProfile
export const getShowProfile = createSelector(
  (state: RootState) => state.showNav.showProfile,
  showProfile => showProfile
);

export default showNavSlice.reducer;
