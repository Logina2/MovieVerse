import React, { useContext, useState } from "react";
import { MovieContext } from "../Context/MovieContext";
import MovieCard from "../components/MovieCard";
import { Container, Box, Button, Stack, Fab, Dialog, Typography } from "@mui/material";
import { Add as AddIcon, Whatshot, StarRate, MovieFilter } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import AddMovie from "./AddMovie";

export default function Home() {
    const { movies, trending, topRated, fetchMoviesByCategory } = useContext(MovieContext);
    const { search } = useLocation();
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [openAdd, setOpenAdd] = useState(false);

    const query = new URLSearchParams(search).get("search") || "";
    const categories = ["All", "Action", "Comedy", "Drama", "Sci-Fi", "Horror", "Romance", "Thriller"];

    const handleCategoryClick = (cat) => {
        setSelectedCategory(cat);
        fetchMoviesByCategory(cat);
    };

    const filteredMovies = Array.isArray(movies)
        ? movies.filter((movie) => movie.title?.toLowerCase().includes(query.toLowerCase()))
        : [];

    const SectionHeader = ({ icon, title }) => (
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3, mt: query ? 0 : 6 }}>
            {icon}
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>{title}</Typography>
        </Stack>
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

            {!query && selectedCategory === "All" && trending.length > 0 && (
                <Box sx={{ mb: 4 }}>
                    <SectionHeader icon={<Whatshot sx={{ color: '#ff6b35', fontSize: 32 }} />} title="Trending Now" />
                    <Box sx={{
                        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 3
                    }}>
                        {trending.slice(0, 6).map((m) => (
                            <MovieCard key={m.id} movie={m} />
                        ))}
                    </Box>
                </Box>
            )}

            {!query && selectedCategory === "All" && topRated.length > 0 && (
                <Box sx={{ mb: 4 }}>
                    <SectionHeader icon={<StarRate sx={{ color: '#ffc107', fontSize: 32 }} />} title="Top Rated" />
                    <Box sx={{
                        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 3
                    }}>
                        {topRated.slice(0, 6).map((m) => (
                            <MovieCard key={m.id} movie={m} />
                        ))}
                    </Box>
                </Box>
            )}

            <Box sx={{ mb: 2 }}>
                <SectionHeader icon={<MovieFilter sx={{ color: '#e50914', fontSize: 32 }} />}
                    title={query ? `Results for "${query}"` : selectedCategory === "All" ? "Popular Movies" : selectedCategory} />
            </Box>

            {filteredMovies.length > 0 ? (
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 3 }}>
                    {filteredMovies.map((m) => (
                        <MovieCard key={m.id} movie={m} />
                    ))}
                </Box>
            ) : (
                <Box sx={{ textAlign: 'center', mt: 5 }}>
                    <Typography variant="h5" color="gray">No movies found</Typography>
                </Box>
            )}

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