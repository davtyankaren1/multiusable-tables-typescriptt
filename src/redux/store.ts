import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./productSlice";
import { pricePlanReducer } from "./pricePlanSlice";
import { pageReducer } from "./pageSlice";
import { countryReducer } from "./countriesSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    pricePlans: pricePlanReducer,
    pages: pageReducer,
    countries: countryReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
