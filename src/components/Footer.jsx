import React, { useContext } from "react";
import { Box, Container, Grid, Typography, Link, Stack, IconButton, Divider } from "@mui/material";
import { MovieFilter, Facebook, Instagram, GitHub } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export default function Footer() {
    const { user } = useContext(UserContext);
    const currentYear = new Date().getFullYear();

    return (
        <Box component="footer" sx={{ bgcolor: "#000000", color: "#94a3b8", py: 6, mt: "auto", borderTop: "1px solid #1e293b" }}>
            <Container maxWidth="lg">
                <Grid container spacing={4} sx={{ justifyContent: "space-between" }}>
                    <Grid item xs={12} md={4}>
                        <Stack direction="row" spacing={1} sx={{ mb: 2, alignItems: "center" }}>
                            <MovieFilter sx={{ color: "#e50914", fontSize: 35 }} />
                            <Typography variant="h5" fontWeight="bold" sx={{ color: "white" }}>MOVIE<span style={{ color: "#e50914" }}>VERSE</span></Typography>
                        </Stack>
                        <Typography variant="body2">Explore the latest movies, create your personal watchlist, and stay updated with the world of cinema.</Typography>
                    </Grid>

                    <Grid item xs={6} md={2}>
                        <Stack spacing={1}>
                            <Link component={RouterLink} to="/" color="inherit" underline="hover">Home</Link>
                            <Link component={RouterLink} to="/watchlist" color="inherit" underline="hover">Watchlist</Link>
                            <Link component={RouterLink} to={user ? "/profile" : "/join"} color="inherit" underline="hover">My Profile</Link>
                        </Stack>
                    </Grid>

                    <Grid item xs={6} md={2}>
                        <Typography variant="h6" color="white" fontWeight="bold" sx={{ mb: 2 }}>Follow Us</Typography>
                        <Stack direction="row" spacing={1}>
                            <IconButton href="https://facebook.com" target="_blank" size="small" sx={{ color: "inherit", '&:hover': { color: "#e50914" } }}><Facebook /></IconButton>
                            <IconButton href="https://instagram.com" target="_blank" size="small" sx={{ color: "inherit", '&:hover': { color: "#e50914" } }}><Instagram /></IconButton>
                            <IconButton href="https://github.com" target="_blank" size="small" sx={{ color: "inherit", '&:hover': { color: "#e50914" } }}><GitHub /></IconButton>
                        </Stack>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4, bgcolor: "#1e293b" }} />

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: { xs: "column", md: "row" } }}>
                    <Typography variant="body2">© {currentYear} <span style={{ color: "white", fontWeight: "bold" }}>MovieVerse</span>. All rights reserved.</Typography>
                    <Typography variant="caption">Designed with ❤️ for Cinema Lovers</Typography>
                </Box>
            </Container>
        </Box>
    );
}