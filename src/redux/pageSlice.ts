import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Page } from "../types";
import axios from "axios";

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

export const fetchPages = createAsyncThunk<Page[]>(
  "pages/fetchPages",
  async () => {
    const response = await axios.get("http://localhost:5050/pages");
    return response.data;
  }
);

export const editPage = createAsyncThunk<Page, Page>(
  "pages/editPage",
  async (updatedPage) => {
    const response = await axios.put(
      `http://localhost:5050/pages/${updatedPage.id}`,
      updatedPage
    );
    return response.data;
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
