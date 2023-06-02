import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Product, ProductState } from "../../Constants/commonType";



// Fetch data from API
export const fetchProducts: any = createAsyncThunk(
  "products/fetchProducts",
  async (skip: number) => {
    const response = await axios.get(
      `https://dummyjson.com/products?limit=8&skip=${skip?skip:0}`
    );
    return response.data as Product[];
  }
);

const initialState: ProductState = {
  loading: false,
  products: [],
  error: "",
  totalProduct: 100,
  skip: 0,
}
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    paginationData: (state, action: PayloadAction<number>) => {
      state.skip = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = "";
    });

    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error =
        action.error.message || "Error occurred while fetching products.";
    });
  },
});

export default productSlice.reducer;
export const { paginationData } = productSlice.actions;
