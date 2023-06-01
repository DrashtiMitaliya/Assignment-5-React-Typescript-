import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import productReducer, { ProductState } from '../Reducers/ProductSlice';

// Define the root state type
export interface RootState {
  products: ProductState;
}

// Create the root reducer
const rootReducer = combineReducers<RootState>({
  products: productReducer
});

// Create the Redux store
const store = configureStore({
  reducer: rootReducer
});

export default store;
