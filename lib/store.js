

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice"
import wishlistReducer from "./wishSlice"

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        wishlist: wishlistReducer
    },
})