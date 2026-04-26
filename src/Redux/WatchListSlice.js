import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
    const response = await axios.get("http://localhost:5000/movies");
    return response.data;
});

const watchlistSlice = createSlice({
    name: "watchlist",
    initialState: {
        allMovies: [],
        items: [],
        status: "idle",
    },
    reducers: {
        toggleWatchlist: (state, action) => {
            const movie = action.payload;
            const index = state.items.findIndex((m) => m.id === movie.id);
            if (index >= 0) {
                state.items.splice(index, 1);
            } else {
                state.items.push(movie);
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.allMovies = action.payload;
            state.status = "succeeded";
        });
    },
});

export const { toggleWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;