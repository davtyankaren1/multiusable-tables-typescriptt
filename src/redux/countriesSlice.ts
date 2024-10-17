import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Country } from "../types";
import axios from "axios";

interface CountryState {
  countries: Country[];
  loading: boolean;
  error: string | null;
}

const initialState: CountryState = {
  countries: [],
  loading: false,
  error: null
};

export const fetchCountries = createAsyncThunk<Country[]>(
  "countries/fetchCountries",
  async () => {
    const response = await axios.get<Country[]>(
      "http://localhost:5050/countries"
    );
    return response.data;
  }
);

export const editCountry = createAsyncThunk<Country, Country>(
  "countries/editCountry",
  async (updatedCountry) => {
    const response = await axios.put<Country>(
      `http://localhost:5050/countries/${updatedCountry.id}`,
      updatedCountry
    );
    return response.data;
  }
);

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch countries";
      })
      .addCase(editCountry.pending, (state) => {
        state.loading = true;
      })
      .addCase(editCountry.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.countries.findIndex(
          (country) => country.id === action.payload.id
        );
        if (index !== -1) {
          state.countries[index] = action.payload;
        }
      })
      .addCase(editCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to edit country";
      });
  }
});

export const countryReducer = countriesSlice.reducer;
