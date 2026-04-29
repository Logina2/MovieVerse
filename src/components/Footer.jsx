import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Stack, Divider } from '@mui/material';
import { Facebook, Twitter, Instagram, YouTube, MovieFilter } from '@mui/icons-material';

const Footer = () => {
    return (
        <Box component="footer" sx={{ bgcolor: '#000', color: '#808080', py: 6, borderTop: '1px solid #333', mt: 'auto' }}>
            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="space-between">
                    {/* Brand & Social */}
                    <Grid item xs={12} md={4}>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                            <MovieFilter sx={{ color: '#e50914', fontSize: 32 }} />
                            <Typography variant="h6" color="white" fontWeight="bold">MOVIEVERSE</Typography>
                        </Stack>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            Your favorite platform for tracking movies, creating watchlists, and discovering the latest in cinema.
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <IconButton color="inherit" sx={{ '&:hover': { color: '#e50914' } }}><Facebook /></IconButton>
                            <IconButton color="inherit" sx={{ '&:hover': { color: '#e50914' } }}><Twitter /></IconButton>
                            <IconButton color="inherit" sx={{ '&:hover': { color: '#e50914' } }}><Instagram /></IconButton>
                            <IconButton color="inherit" sx={{ '&:hover': { color: '#e50914' } }}><YouTube /></IconButton>
                        </Stack>
                    </Grid>

                    {/* Quick Links */}
                    <Grid item xs={6} md={2}>
                        <Typography variant="subtitle1" color="white" fontWeight="bold" gutterBottom>Explore</Typography>
                        <Stack spacing={1}>
                            <Link href="/" color="inherit" underline="none">Home</Link>
                            <Link href="/watchlist" color="inherit" underline="none">Watchlist</Link>
                            <Link href="/profile" color="inherit" underline="none">Profile</Link>
                        </Stack>
                    </Grid>

                    {/* Support */}
                    <Grid item xs={6} md={2}>
                        <Typography variant="subtitle1" color="white" fontWeight="bold" gutterBottom>Support</Typography>
                        <Stack spacing={1}>
                            <Link href="#" color="inherit" underline="none">Help Center</Link>
                            <Link href="#" color="inherit" underline="none">Terms of Service</Link>
                            <Link href="#" color="inherit" underline="none">Contact Us</Link>
                        </Stack>
                    </Grid>
                </Grid>
                <Divider sx={{ my: 4, bgcolor: '#333' }} />
                <Typography variant="body2" align="center">
                    © {new Date().getFullYear()} MovieVerse. All rights reserved. Made with ❤️ for Movie Lovers.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;