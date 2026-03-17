import { createSlice } from "@reduxjs/toolkit";

const adsSlice = createSlice({
  name: "ads",
  initialState: {
    latestAds: [],
    categoryAds: [],
    adDetail: null,
  },
  reducers: {
    setLatestAds: (state, action) => {
      state.latestAds = action.payload;
    },
    setCategoryAds: (state, action) => {
      state.categoryAds = action.payload;
    },
    setAdDetail: (state, action) => {
      state.adDetail = action.payload;
    },
  },
});

export const { setLatestAds, setCategoryAds, setAdDetail } = adsSlice.actions;
export default adsSlice.reducer;
