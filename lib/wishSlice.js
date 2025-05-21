import { createSlice } from "@reduxjs/toolkit";


const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
  },
  reducers: {
    addToWishList: (state, action) => {
      const item = action.payload;
        if (!state.items.some((existingItem) => existingItem.id === item.id)){
            state.items.push(item)
        }
    },

    removeFromWishList: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
})

export const {addToWishList, removeFromWishList} = wishlistSlice.actions
export default wishlistSlice.reducer
