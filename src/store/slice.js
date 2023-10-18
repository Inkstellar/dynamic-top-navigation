import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  menuItems: [],
  topMenuCount: 3,
  activeMenu: 0,
};

export const addItem = createAction('addItem');
export const deleteItem = createAction('deleteItem');
export const makeActive = createAction('makeActive');
export const setActiveMenu = createAction('setActiveMenu');

const dataSlice = createSlice({
  name: 'storeData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setActiveMenu, (state, action) => {
        console.log(action.payload);
        state.activeMenu = action.payload;
      })
      .addCase(addItem, (state, action) => {
        state.menuItems = [...state.menuItems, action.payload];
      })
      .addCase(deleteItem, (state, action) => {
        console.log(state.menuItems);
        state.menuItems = state.menuItems.filter(
          (item) => item !== action.payload
        );
      })
      .addCase(makeActive, (state, action) => {
        let index = state.menuItems.findIndex(
          (item) => item === action.payload
        );
        state.menuItems.splice(index, 1);
        state.menuItems.splice(2, 0, action.payload);
      });
  },
});

// Export the reducer for setting up the store
export default dataSlice.reducer;
