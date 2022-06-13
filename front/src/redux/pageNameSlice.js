import { createSlice } from '@reduxjs/toolkit';

export const pageNameSlice = createSlice({
  name: 'pageName',
  initialState: {
    pageName: "",
  },
  reducers: {
    setPageName: (state, action) => {
      state.pageName = action.payload;
    },
    setPageNameJson: (state, action) => {
      state.pageName = JSON.parse(action.payload).name;
    },
  },
});

export const { setPageName, setPageNameJson } = pageNameSlice.actions;

export default pageNameSlice.reducer;