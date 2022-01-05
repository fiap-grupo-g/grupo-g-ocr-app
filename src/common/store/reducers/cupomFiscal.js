import { createSlice } from '@reduxjs/toolkit';
import { readCupom } from '../thunks/cupomFiscal';

export const slice = createSlice({
  name: 'cupomFiscal',
  initialState: {
    isLoading: false,
    isSuccess: false,
    error: null,
    cupomFiscal: null,
  },
  reducers: {},
  extraReducers: {
    [readCupom.pending]: (state) => {
      state.isLoading = true;
    },
    [readCupom.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.error = null;
      state.cupomFiscal = action.payload;
    },
    [readCupom.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.error = action.error.message;
    },
  },
});

export default slice.reducer;
