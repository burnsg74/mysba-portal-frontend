import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type NavState = {
  value: boolean;
};

const initialState: NavState = {
  value: true,
}

export const showNavSlice = createSlice({
  name: 'showNav',
  initialState,
  reducers: {
    setNav: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
      console.log('Show Nav', state.value)
    },
  },
});

export const { setNav } = showNavSlice.actions;

export const getShowNav = createSelector(
    (state: RootState) => state.showNav.value,
    (showNav) => showNav
);

export default showNavSlice.reducer;