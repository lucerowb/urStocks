import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import companyService from "./companyService";

const detailInitialState = {
  company: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// update company
export const updateCompany = createAsyncThunk(
  "companyDetail/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token;
      return await companyService.updateCompany({ id, formData });
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

// get company by id
export const getCompanyById = createAsyncThunk(
  "companyDetail/getCompanyById",
  async (id, thunkAPI) => {
    try {
      // const token = thunkAPI.getState().auth.user.token;
      return await companyService.getCompanyById(id);
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

export const companyDetailSlice = createSlice({
  name: "companyDetail",
  detailInitialState,
  reducers: {
    resetCompanyDetail: (state) => detailInitialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.company.push(action.payload);
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCompanyById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCompanyById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.company = action.payload;
      })
      .addCase(getCompanyById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetCompanyDetail } = companyDetailSlice.actions;
export default companyDetailSlice.reducer;
