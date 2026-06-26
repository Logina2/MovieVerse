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

    if (!movie) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: '80vh', alignItems: 'center' }}>
            <CircularProgress color="error" />
        </Box>
    );

    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '100%',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                pt: 10,
                pb: 5,
                bgcolor: 'black'
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(${movie.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(12px) brightness(0.6)',
                    transform: 'scale(1.1)',
                    zIndex: 0
                }}
            />

            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to right, rgba(0,0,0,0.5) 10%, transparent 100%)',
                    zIndex: 1
                }}
            />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                <Button
                    startIcon={<ArrowBack />}
                    onClick={() => navigate(-1)}
                    sx={{
                        color: 'white',
                        mb: 4,
                        bgcolor: 'rgba(0,0,0,0.3)',
                        backdropFilter: 'blur(10px)',
                        px: 2,
                        borderRadius: '10px',
                        '&:hover': { bgcolor: '#e50914' }
                    }}
                >
                    Back to Movies
                </Button>

                <Grid container spacing={6} alignItems="center">
                    <Grid item xs={12} md={4}>
                        <Paper
                            elevation={24}
                            sx={{
                                borderRadius: '20px',
                                overflow: 'hidden',
                                border: '1px solid rgba(255,255,255,0.2)',
                                transition: '0.4s',
                                height: { xs: '450px', md: '550px' },
                                '&:hover': { transform: 'scale(1.02)' }
                            }}
                        >
                            <img
                                src={movie.image}
                                alt={movie.title}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: 'block'
                                }}
                            />
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Stack spacing={3} sx={{ color: 'white' }}>
                            <Typography
                                variant="h2"
                                fontWeight="bold"
                                sx={{
                                    textShadow: '2px 4px 15px rgba(0,0,0,0.6)',
                                    fontSize: { xs: '2.5rem', md: '3.5rem' }
                                }}
                            >
                                {movie.title}
                            </Typography>

                            <Stack direction="row" spacing={2} alignItems="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', color: '#ffc107', bgcolor: 'rgba(0,0,0,0.5)', px: 1.5, py: 0.5, borderRadius: '10px' }}>
                                    <Star sx={{ mr: 0.5 }} />
                                    <Typography variant="h6" fontWeight="bold">{movie.rating}</Typography>
                                </Box>
                                <Typography
                                    sx={{
                                        color: 'white',
                                        bgcolor: '#e50914',
                                        px: 2,
                                        py: 0.5,
                                        borderRadius: '20px',
                                        fontWeight: 'bold',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    {movie.category}
                                </Typography>
                            </Stack>

                            <Typography
                                variant="body1"
                                sx={{
                                    lineHeight: 1.8,
                                    fontSize: '1.15rem',
                                    textShadow: '1px 1px 10px rgba(0,0,0,0.8)',
                                    maxWidth: '800px',
                                    opacity: 0.9
                                }}
                            >
                                {movie.description || "No description provided for this movie. Enjoy the magic of cinema!"}
                            </Typography>

                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<PlayArrow />}
                                sx={{
                                    bgcolor: '#e50914',
                                    width: 'fit-content',
                                    px: 6,
                                    py: 1.5,
                                    borderRadius: '30px',
                                    fontWeight: 'bold',
                                    fontSize: '1.1rem',
                                    boxShadow: '0 8px 20px rgba(229, 9, 20, 0.3)',
                                    '&:hover': { bgcolor: '#b20710', transform: 'translateY(-2px)' },
                                    transition: '0.3s'
                                }}
                            >
                                Watch Now
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}