import { createSlice } from '@reduxjs/toolkit';

export const pageNameSlice = createSlice({
  name: 'pageName',
  initialState: {
    pageName: "",
    openTime: "",
  },
  reducers: {
    setPageName: (state, action) => {
      state.pageName = action.payload;
    },
    setNowDate: (state, action) => {
      state.openTime = action.payload;
    },
    setPageNameJson: (state, action) => {
      state.pageName = JSON.parse(action.payload).name;
      state.openTime = JSON.parse(action.payload).time;
    },
  },
});

export const { setPageName, setNowDate, setPageNameJson } = pageNameSlice.actions;

export default pageNameSlice.reducer;