import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MovieContext } from "../Context/MovieContext";
import { Container, Grid, Typography, Box, Button, Stack, CircularProgress, Paper, Chip, Avatar, AvatarGroup } from "@mui/material";
import { Star, ArrowBack, PlayArrow, AccessTime, CalendarMonth, Language } from "@mui/icons-material";
import MovieCard from "../components/MovieCard";

export default function MovieDetails() {
    const { id } = useParams();
    const { fetchMovieById, fetchRecommendations } = useContext(MovieContext);
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMovie = async () => {
            setLoading(true);
            const data = await fetchMovieById(id);
            setMovie(data);
            if (data) {
                const recs = await fetchRecommendations(id);
                setRecommendations(recs);
            }
            setLoading(false);
        };
        loadMovie();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: '80vh', alignItems: 'center' }}>
            <CircularProgress color="error" />
        </Box>
    );

    const trailerKey = movie?.videos?.results?.find(
        (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
    )?.key;
    const watchUrl = trailerKey
        ? `https://www.youtube.com/watch?v=${trailerKey}`
        : movie?.homepage || `https://www.themoviedb.org/movie/${id}`;

    if (!movie) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: '80vh', alignItems: 'center' }}>
            <Typography variant="h4" color="white">Movie not found</Typography>
        </Box>
    );

    return (
        <Box>
            <Box sx={{ minHeight: '100vh', width: '100%', position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden', pt: 10, pb: 5, bgcolor: 'black' }}>
                <Box sx={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundImage: `url(${movie.backdrop || movie.image})`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    filter: 'blur(12px) brightness(0.4)', transform: 'scale(1.1)', zIndex: 0
                }} />
                <Box sx={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'linear-gradient(to right, rgba(0,0,0,0.7) 10%, transparent 100%)', zIndex: 1
                }} />

                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                    <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{
                        color: 'white', mb: 4, bgcolor: 'rgba(0,0,0,0.3)',
                        backdropFilter: 'blur(10px)', px: 2, borderRadius: '10px',
                        '&:hover': { bgcolor: '#e50914' }
                    }}>
                        Back to Movies
                    </Button>

                    <Grid container spacing={6} alignItems="center">
                        <Grid item xs={12} md={4}>
                            <Paper elevation={24} sx={{
                                borderRadius: '20px', overflow: 'hidden',
                                border: '1px solid rgba(255,255,255,0.2)',
                                transition: '0.4s', height: { xs: '450px', md: '550px' },
                                '&:hover': { transform: 'scale(1.02)' }
                            }}>
                                <img src={movie.image} alt={movie.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={8}>
                            <Stack spacing={2.5} sx={{ color: 'white' }}>
                                <Typography variant="h2" fontWeight="bold" sx={{
                                    textShadow: '2px 4px 15px rgba(0,0,0,0.6)',
                                    fontSize: { xs: '2.5rem', md: '3.5rem' }
                                }}>
                                    {movie.title}
                                </Typography>

                                <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                                    <Box sx={{ display: 'flex', alignItems: 'center', color: '#ffc107', bgcolor: 'rgba(0,0,0,0.5)', px: 1.5, py: 0.5, borderRadius: '10px' }}>
                                        <Star sx={{ mr: 0.5 }} />
                                        <Typography variant="h6" fontWeight="bold">{movie.rating}</Typography>
                                    </Box>
                                    <Chip icon={<CalendarMonth />} label={movie.releaseYear}
                                        sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }} />
                                    <Chip icon={<AccessTime />} label={movie.runtime}
                                        sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }} />
                                </Stack>

                                <Stack direction="row" spacing={1} flexWrap="wrap">
                                    {movie.genres?.map((genre) => (
                                        <Chip key={genre.id} label={genre.name}
                                            sx={{ color: 'white', bgcolor: '#e50914', fontWeight: 'bold' }} />
                                    ))}
                                </Stack>

                                <Typography variant="body1" sx={{
                                    lineHeight: 1.8, fontSize: '1.15rem',
                                    textShadow: '1px 1px 10px rgba(0,0,0,0.8)',
                                    maxWidth: '800px', opacity: 0.9
                                }}>
                                    {movie.description}
                                </Typography>

                                {movie.tagline && (
                                    <Typography variant="subtitle1" sx={{ fontStyle: 'italic', color: 'gray' }}>
                                        "{movie.tagline}"
                                    </Typography>
                                )}

                                {movie.cast?.length > 0 && (
                                    <Box>
                                        <Typography variant="subtitle2" sx={{ color: 'gray', mb: 1 }}>Cast</Typography>
                                        <AvatarGroup max={6} sx={{ justifyContent: 'flex-start' }}>
                                            {movie.cast.map((actor) => (
                                                <Avatar key={actor.id} alt={actor.name}
                                                    src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : undefined}
                                                    sx={{ border: '2px solid #e50914' }}>
                                                    {actor.name?.[0]}
                                                </Avatar>
                                            ))}
                                        </AvatarGroup>
                                    </Box>
                                )}

                                <Button variant="contained" size="large" startIcon={<PlayArrow />}
                                    component="a" href={watchUrl} target="_blank" rel="noopener noreferrer"
                                    sx={{
                                        bgcolor: '#e50914', width: 'fit-content', px: 6, py: 1.5,
                                        borderRadius: '30px', fontWeight: 'bold', fontSize: '1.1rem',
                                        boxShadow: '0 8px 20px rgba(229, 9, 20, 0.3)',
                                        '&:hover': { bgcolor: '#b20710', transform: 'translateY(-2px)' },
                                        transition: '0.3s', textDecoration: 'none'
                                    }}>
                                    {trailerKey ? "Watch Trailer" : "View on TMDB"}
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {recommendations.length > 0 && (
                <Box sx={{ bgcolor: 'black', pb: 8, pt: 2 }}>
                    <Container maxWidth="xl">
                        <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', mb: 4, pl: 1 }}>
                            You Might Also Like
                        </Typography>
                        <Grid container spacing={3}>
                            {recommendations.map((rec) => (
                                <Grid item xs={12} sm={6} md={4} lg={2} key={rec.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <MovieCard movie={rec} />
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>
            )}
        </Box>
    );
}