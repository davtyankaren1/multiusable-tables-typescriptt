import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../types";
import products from "../../data.json";
import axios from "axios";

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null
};

export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async () => {
    try {
      const response = await axios.get("http://localhost:5050/products");
      return response.data;
    } catch (error) {
      console.error("Fetching products failed, using fallback data:", error);
      return products.products;
    }
  }
);

export const editProduct = createAsyncThunk<Product, Product>(
  "products/editProduct",
  async (updatedProduct) => {
    try {
      const response = await axios.put(
        `http://localhost:5050/products/${updatedProduct.id}`,
        updatedProduct
      );
      return response.data;
    } catch (error) {
      const index = products.products.findIndex(
        (product: any) => product.id === updatedProduct.id
      );
      if (index !== -1) {
        return { ...products.products[index], ...updatedProduct };
      }
      throw new Error("Product not found in fallback data");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(editProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to edit product";
      });
  }
});

export const productReducer = productSlice.reducer;
