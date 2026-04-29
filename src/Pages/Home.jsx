import React, { useContext, useState } from "react";
import { MovieContext } from "../Context/MovieContext";
import MovieCard from "../components/MovieCard";
import { Container, Box, Button, Stack, Fab, Dialog } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import AddMovie from "./AddMovie";

export default function Home() {
    const { movies, fetchMoviesByCategory } = useContext(MovieContext);
    const { search } = useLocation();
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [openAdd, setOpenAdd] = useState(false);

    const query = new URLSearchParams(search).get("search") || "";
    const categories = ["All", "Action", "Comedy", "Drama", "Sci-Fi"];

    const handleCategoryClick = (cat) => {
        setSelectedCategory(cat);
        fetchMoviesByCategory(cat);
    };

    const filteredMovies = movies.filter((movie) =>
        movie.title?.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <Container maxWidth="xl" sx={{ py: 10 }}>
            <Box sx={{ mb: 5 }}>
                <Stack direction="row" spacing={2} sx={{ justifyContent: "center", flexWrap: "wrap", gap: 1 }}>
                    {categories.map((cat) => (
                        <Button
                            key={cat}
                            variant={selectedCategory === cat ? "contained" : "outlined"}
                            onClick={() => handleCategoryClick(cat)}
                            sx={{
                                borderRadius: "20px",
                                px: 3,
                                fontWeight: "bold",
                                bgcolor: selectedCategory === cat ? "#e50914" : "transparent",
                                color: "white",
                                borderColor: "#e50914",
                                "&:hover": { bgcolor: "#b20710", borderColor: "#e50914" }
                            }}
                        >
                            {cat}
                        </Button>
                    ))}
                </Stack>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 3 }}>
                {filteredMovies.map((m) => (
                    <MovieCard key={m.id} movie={m} />
                ))}
            </Box>

            <Fab
                color="primary"
                aria-label="add"
                sx={{ position: "fixed", bottom: 40, right: 40, bgcolor: "#e50914", '&:hover': { bgcolor: '#b20710' } }}
                onClick={() => setOpenAdd(true)}
            >
                <AddIcon />
            </Fab>

            <Dialog open={openAdd} onClose={() => setOpenAdd(false)} fullWidth maxWidth="sm">
                <AddMovie closeDialog={() => setOpenAdd(false)} />
            </Dialog>
        </Container>
    );
}