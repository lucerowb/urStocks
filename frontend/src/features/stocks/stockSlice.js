import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import stockService from "./stockService";

const initialState = {
  stocks: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// add new stock
export const addStock = createAsyncThunk(
  "stock/add",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await stockService.addStock(formData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// get all stocks
export const getStocks = createAsyncThunk(
  "stock/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await stockService.getStocks(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addStock.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addStock.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stocks.push(action.payload);
      })
      .addCase(addStock.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getStocks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStocks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stocks = action.payload;
      })
      .addCase(getStocks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = stockSlice.actions;
export default stockSlice.reducer;
