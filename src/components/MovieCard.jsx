import React, { useContext } from "react";
import { Card, CardMedia, CardContent, Typography, Button, CardActions, IconButton, Box, Stack, Chip } from "@mui/material";
import { Favorite, FavoriteBorder, Star, CalendarMonth } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { MovieContext } from "../Context/MovieContext";
import { useDispatch, useSelector } from "react-redux";
import { toggleWatchlist } from "../Redux/WatchListSlice";

export default function MovieCard({ movie }) {
    const { deleteMovie } = useContext(MovieContext);
    const dispatch = useDispatch();
    const watchlist = useSelector(state => state.watchlist.items);
    const isFavorite = watchlist.some(m => m.id === movie.id);

    return (
        <Card sx={{
            height: '100%', width: '100%', maxWidth: 345, bgcolor: '#141414', color: 'white', position: 'relative', borderRadius: '16px',
            transition: '0.3s', '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 12px 25px rgba(229, 9, 20, 0.4)' }
        }}>
            <Box sx={{
                position: 'absolute', top: 0, left: 0, right: 0, p: 1.5,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10
            }}>
                <Stack direction="row" spacing={0.5} alignItems="center"
                    sx={{ bgcolor: 'rgba(0,0,0,0.6)', px: 1, py: 0.5, borderRadius: '20px', color: '#ffc107' }}>
                    <Star fontSize="small" />
                    <Typography variant="body2" fontWeight="bold">{movie.rating}</Typography>
                </Stack>

                <IconButton
                    onClick={(e) => {
                        e.preventDefault();
                        dispatch(toggleWatchlist(movie));
                    }}
                    sx={{ color: isFavorite ? '#e50914' : 'white', bgcolor: 'rgba(0,0,0,0.5)' }}
                >
                    {isFavorite ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
            </Box>

            <CardMedia component="img" height="350" image={movie.image} alt={movie.title} sx={{ objectFit: 'cover' }} />

            <CardContent sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h6" fontWeight="bold" noWrap>{movie.title}</Typography>
                <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
                    <Chip icon={<CalendarMonth sx={{ fontSize: 14 }} />} label={movie.releaseYear} size="small"
                        sx={{ color: 'gray', bgcolor: 'rgba(255,255,255,0.05)', fontSize: '0.75rem' }} />
                    <Chip label={movie.category} size="small"
                        sx={{ color: '#e50914', bgcolor: 'rgba(229,9,20,0.1)', fontWeight: 'bold', fontSize: '0.75rem' }} />
                </Stack>
                <Typography variant="body2" sx={{ color: 'gray', mt: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textAlign: 'center' }}>
                    {movie.description}
                </Typography>
            </CardContent>

            <CardActions sx={{ justifyContent: 'center', pb: 3, px: 2, gap: 1 }}>
                <Button component={Link} to={`/movies/${movie.id}`} variant="contained" fullWidth sx={{ borderRadius: '25px', textTransform: 'none', bgcolor: '#e50914' }}>
                    Details
                </Button>
                <Button variant="outlined" color="error" fullWidth onClick={() => deleteMovie(movie.id)} sx={{ borderRadius: '25px', textTransform: 'none' }}>
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
}