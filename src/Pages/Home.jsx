import React, { useContext, useState } from "react";
import { MovieContext } from "../Context/MovieContext";
import MovieCard from "../components/MovieCard";

import {
    Container,
    Typography,
    Box,
    Button,
    Stack,
    Fab,
    Dialog
} from "@mui/material";

import { Add as AddIcon } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import AddMovie from "./AddMovie";

export default function Home() {
    const { movies } = useContext(MovieContext);
    const { search } = useLocation();

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [openAdd, setOpenAdd] = useState(false);

    const query = new URLSearchParams(search).get("search") || "";

    const categories = ["All", "Action", "Comedy", "Drama", "Sci-Fi"];

    const filteredMovies = Array.isArray(movies)
        ? movies.filter((movie) => {
            const matchesSearch = movie.title
                ?.toLowerCase()
                .includes(query.toLowerCase());

            const matchesCategory =
                selectedCategory === "All" ||
                movie.category === selectedCategory;

            return matchesSearch && matchesCategory && movie.image;
        })
        : [];

    return (
        <Container maxWidth="xl" sx={{ mt: 12, mb: 10, position: "relative" }}>

            <Fab
                color="error"
                onClick={() => setOpenAdd(true)}
                sx={{
                    position: "fixed",
                    bottom: 40,
                    right: 40,
                    zIndex: 1000,
                    bgcolor: "#e50914"
                }}
            >
                <AddIcon />
            </Fab>

            <Dialog
                open={openAdd}
                onClose={() => setOpenAdd(false)}
                fullWidth
                maxWidth="sm"
                slotProps={{
                    paper: {
                        sx: { bgcolor: "transparent", boxShadow: "none" }
                    }
                }}
            >
                <AddMovie closeDialog={() => setOpenAdd(false)} />
            </Dialog>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    mb: 8
                }}
            >
                <Typography
                    variant="h2"
                    fontWeight="bold"
                    sx={{ color: "white", mb: 4 }}
                >
                    Explore Movies
                </Typography>

                <Stack
                    direction="row"
                    spacing={1.5}
                    flexWrap="wrap"
                    justifyContent="center"
                >
                    {categories.map((cat) => (
                        <Button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            variant={
                                selectedCategory === cat ? "contained" : "outlined"
                            }
                            sx={{
                                borderRadius: "30px",
                                px: 4,
                                fontWeight: "bold",
                                textTransform: "none",
                                bgcolor:
                                    selectedCategory === cat
                                        ? "#e50914"
                                        : "transparent",
                                color: "white",
                                borderColor: "#e50914",
                                "&:hover": {
                                    bgcolor: "#b20710",
                                    borderColor: "#e50914"
                                }
                            }}
                        >
                            {cat}
                        </Button>
                    ))}
                </Stack>
            </Box>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 345px))',
                    gap: 3,
                    justifyContent: 'center'
                }}
            >
                {filteredMovies.length > 0 ? (
                    filteredMovies.map((m) => (
                        <MovieCard key={m.id} movie={m} />
                    ))
                ) : (
                    <Typography
                        variant="h4"
                        sx={{
                            textAlign: "center",
                            color: "white",
                            mt: 5,
                            gridColumn: "1 / -1"
                        }}
                    >
                        No movies found 🎬
                    </Typography>
                )}
            </Box>
        </Container>
    );
}