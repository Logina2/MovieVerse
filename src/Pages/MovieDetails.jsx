import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MovieContext } from "../Context/MovieContext";
import { Container, Grid, Typography, Box, Button, Stack, CircularProgress, Paper } from "@mui/material";
import { Star, ArrowBack, PlayArrow } from "@mui/icons-material";

export default function MovieDetails() {
    const { id } = useParams();
    const { movies } = useContext(MovieContext);
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        if (movies && movies.length > 0) {
            const foundMovie = movies.find((m) => m.id == id);
            setMovie(foundMovie);
        }
    }, [id, movies]);

    if (!movie) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                <CircularProgress color="error" />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 12, mb: 10 }}>
            <Button
                startIcon={<ArrowBack />}
                onClick={() => navigate(-1)}
                sx={{ color: 'white', mb: 4, '&:hover': { color: '#e50914' } }}
            >
                Back to Movies
            </Button>

            <Grid container spacing={6}>
                <Grid item xs={12} md={5}>
                    <Paper elevation={10} sx={{ borderRadius: '15px', overflow: 'hidden', bgcolor: 'transparent' }}>
                        <Box
                            component="img"
                            src={movie.image}
                            alt={movie.title}
                            sx={{
                                width: '100%',
                                height: 'auto',
                                display: 'block',
                                transition: '0.3s',
                                '&:hover': { transform: 'scale(1.02)' }
                            }}
                        />
                    </Paper>
                </Grid>

                <Grid item xs={12} md={7}>
                    <Stack spacing={3}>
                        <Typography variant="h2" fontWeight="bold" sx={{ color: 'white', fontSize: { xs: '2.5rem', md: '3.75rem' } }}>
                            {movie.title}
                        </Typography>

                        <Stack direction="row" spacing={2} alignItems="center">
                            <Box sx={{ display: 'flex', alignItems: 'center', color: '#ffc107' }}>
                                <Star sx={{ mr: 0.5 }} />
                                <Typography variant="h6" fontWeight="bold">{movie.rating}</Typography>
                            </Box>
                            <Typography sx={{ color: 'rgba(255,255,255,0.6)' }}>|</Typography>
                            <Typography sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)', px: 2, py: 0.5, borderRadius: '20px' }}>
                                {movie.category}
                            </Typography>
                        </Stack>

                        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, fontSize: '1.1rem' }}>
                            {movie.description || "No description available for this movie yet. Stay tuned for more details!"}
                        </Typography>

                        <Box sx={{ pt: 2 }}>
                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<PlayArrow />}
                                sx={{
                                    bgcolor: '#e50914',
                                    px: 5,
                                    py: 1.5,
                                    borderRadius: '30px',
                                    fontWeight: 'bold',
                                    '&:hover': { bgcolor: '#b20710' }
                                }}
                            >
                                Download
                            </Button>
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    );
}