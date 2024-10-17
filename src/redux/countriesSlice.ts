import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Country } from "../types";
import axios from "axios";
import countries from "../../data.json";

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

export const fetchCountries = createAsyncThunk<Country[], void>(
  "countries/fetchCountries",
  async () => {
    try {
      const response = await axios.get("http://localhost:5050/countries");
      return response.data;
    } catch (error) {
      console.error("Fetching countries failed, using fallback data:", error);
      return countries.countries;
    }
  }
);

export const editCountry = createAsyncThunk<Country, Country>(
  "countries/editCountry",
  async (updatedCountry, { getState }) => {
    try {
      const response = await axios.put<Country>(
        `http://localhost:5050/countries/${updatedCountry.id}`,
        updatedCountry
      );
      return response.data;
    } catch (error) {
      console.error("Failed to edit country:", error);

      const state = getState() as { countries: { countries: Country[] } };
      const index = state.countries.countries.findIndex(
        (country) => country.id === updatedCountry.id
      );

      if (index !== -1) {
        return { ...state.countries.countries[index], ...updatedCountry };
      }

      throw new Error("Country not found in fallback data");
    }
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
