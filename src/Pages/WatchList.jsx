import React from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";

export default function Watchlist() {
    const items = useSelector((state) => state.watchlist.items);

    return (
        <Container maxWidth="xl" sx={{ mt: 12, mb: 10, minHeight: "80vh" }}>
            <Typography variant="h3" sx={{ color: "white", mb: 6, fontWeight: "bold" }}>
                My Watch List
            </Typography>

            {items.length > 0 ? (
                <Grid container spacing={4}>
                    {items.map((movie) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id} sx={{ display: "flex", justifyContent: "center" }}>
                            <MovieCard movie={movie} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Box sx={{ textAlign: "center", mt: 10 }}>
                    <Typography variant="h5" color="gray">Your watchlist is empty 🎬</Typography>
                </Box>
            )}
        </Container>
    );
}