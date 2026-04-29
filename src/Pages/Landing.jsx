import React from "react";
import { Box, Typography, Button, Container, Stack } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";

export default function Landing() {
    const scrollToMovies = () => {
        const section = document.getElementById('movies-section');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Box sx={{
            height: "100vh",
            width: "100%",
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center"
        }}>
            <Container maxWidth="md">
                <Typography variant="h1" sx={{ fontWeight: 900, fontSize: { xs: "3.5rem", md: "5.5rem" }, mb: 2 }}>
                    MOVIE<span style={{ color: "#e50914" }}>VERSE</span>
                </Typography>
                <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                    Unlimited Movies, TV Shows, and More. Explore your next favorite story.
                </Typography>
                <Stack direction="row" spacing={2} justifyContent="center">
                    <Button
                        variant="contained"
                        size="large"
                        onClick={scrollToMovies}
                        startIcon={<PlayArrow />}
                        sx={{ bgcolor: "#e50914", px: 4, py: 1.5, borderRadius: "30px", fontWeight: "bold", '&:hover': { bgcolor: "#b20710" } }}
                    >
                        Browse Now
                    </Button>
                </Stack>
            </Container>
        </Box>
    );
}