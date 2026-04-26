import { configureStore } from "@reduxjs/toolkit";
import watchlistReducer from "./WatchListSlice";

export const store = configureStore({
    reducer: {
        watchlist: watchlistReducer,
    },
});