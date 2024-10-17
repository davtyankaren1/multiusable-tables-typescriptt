import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PricePlan } from "../types";

interface PricePlanState {
  pricePlans: PricePlan[];
  loading: boolean;
  error: string | null;
}

const initialState: PricePlanState = {
  pricePlans: [],
  loading: false,
  error: null
};

export const fetchPricePlans = createAsyncThunk<PricePlan[]>(
  "pricePlans/fetchPricePlans",
  async () => {
    const response = await axios.get("http://localhost:3000/pricesplans");
    return response.data;
  }
);

export const editPricePlan = createAsyncThunk<PricePlan, PricePlan>(
  "pricePlans/editPricePlan",
  async (updatedPricePlan) => {
    const response = await axios.put(
      `http://localhost:3000/pricesplans/${updatedPricePlan.id}`,
      updatedPricePlan
    );
    return response.data;
  }
);

const pricePlanSlice = createSlice({
  name: "pricePlans",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPricePlans.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPricePlans.fulfilled, (state, action) => {
        state.loading = false;
        state.pricePlans = action.payload;
      })
      .addCase(fetchPricePlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch price plans";
      })
      .addCase(editPricePlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(editPricePlan.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.pricePlans.findIndex(
          (pricePlan) => pricePlan.id === action.payload.id
        );
        if (index !== -1) {
          state.pricePlans[index] = action.payload;
        }
      })
      .addCase(editPricePlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to edit price plan";
      });
  }
});

export const pricePlanReducer = pricePlanSlice.reducer;
