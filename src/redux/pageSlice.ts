import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Page } from "../types";
import axios from "axios";
import pages from "../../data.json";

interface PageState {
  pages: Page[];
  loading: boolean;
  error: string | null;
}

const initialState: PageState = {
  pages: [],
  loading: false,
  error: null
};

export const fetchPages = createAsyncThunk<Page[], void>(
  "pages/fetchPages",
  async () => {
    try {
      const response = await axios.get("http://localhost:5050/pages");
      return response.data;
    } catch (error) {
      console.error("Fetching pages failed, using fallback data:", error);
      return pages.pages;
    }
  }
);

export const editPage = createAsyncThunk<Page, Page>(
  "pages/editPage",
  async (updatedPage, { getState }) => {
    try {
      const response = await axios.put(
        `http://localhost:5050/pages/${updatedPage.id}`,
        updatedPage
      );
      return response.data;
    } catch (error) {
      const state = getState() as { pages: { pages: Page[] } };
      const index = state.pages.pages.findIndex(
        (page) => page.id === updatedPage.id
      );
      if (index !== -1) {
        return { ...state.pages.pages[index], ...updatedPage };
      }
      throw new Error("Page not found in fallback data");
    }
  }
);

const pageSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPages.fulfilled, (state, action) => {
        state.loading = false;
        state.pages = action.payload;
      })
      .addCase(fetchPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch pages";
      })
      .addCase(editPage.pending, (state) => {
        state.loading = true;
      })
      .addCase(editPage.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.pages.findIndex(
          (page) => page.id === action.payload.id
        );
        if (index !== -1) {
          state.pages[index] = action.payload;
        }
      })
      .addCase(editPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to edit page";
      });
  }
});

export const pageReducer = pageSlice.reducer;
