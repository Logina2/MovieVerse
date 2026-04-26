import React, { useState, useContext } from "react";
import { MovieContext } from "../Context/MovieContext";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";

export default function AddMovie({ closeDialog }) {
    const { addMovie } = useContext(MovieContext);
    const [movie, setMovie] = useState({
        title: "",
        image: "",
        rating: "",
        description: "",
        category: "Action"
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addMovie(movie)
            .then(() => {
                closeDialog();
            })
            .catch((err) => {
                console.error("Error:", err);
                alert("Failed to save!");
            });
    };

    return (
        <Paper
            elevation={0}
            sx={{
                p: 4,
                bgcolor: '#131415',
                color: 'white',
                borderRadius: 3,
                border: '1px solid #333'
            }}
        >
            <Typography variant="h5" sx={{ color: '#e50914', fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
                Add New Movie
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    fullWidth label="Title" variant="filled" margin="normal" required
                    value={movie.title}
                    onChange={(e) => setMovie({ ...movie, title: e.target.value })}
                    sx={{ bgcolor: '#1a1a1a', borderRadius: 1, input: { color: 'white' } }}
                    InputLabelProps={{ style: { color: '#94a3b8' } }}
                />
                <TextField
                    fullWidth label="Poster URL" variant="filled" margin="normal" required
                    value={movie.image}
                    onChange={(e) => setMovie({ ...movie, image: e.target.value })}
                    sx={{ bgcolor: '#1a1a1a', borderRadius: 1, input: { color: 'white' } }}
                    InputLabelProps={{ style: { color: '#94a3b8' } }}
                />
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        fullWidth label="Rating" type="number" variant="filled" margin="normal" required
                        value={movie.rating}
                        onChange={(e) => setMovie({ ...movie, rating: e.target.value })}
                        sx={{ bgcolor: '#1a1a1a', borderRadius: 1, input: { color: 'white' } }}
                        InputLabelProps={{ style: { color: '#94a3b8' } }}
                        inputProps={{ step: "0.1", min: "0", max: "10" }}
                    />
                    <TextField
                        fullWidth label="Category" variant="filled" margin="normal" required
                        value={movie.category}
                        onChange={(e) => setMovie({ ...movie, category: e.target.value })}
                        sx={{ bgcolor: '#1a1a1a', borderRadius: 1, input: { color: 'white' } }}
                        InputLabelProps={{ style: { color: '#94a3b8' } }}
                    />
                </Box>
                <TextField
                    fullWidth label="Description" multiline rows={3} variant="filled" margin="normal"
                    value={movie.description}
                    onChange={(e) => setMovie({ ...movie, description: e.target.value })}
                    sx={{ bgcolor: '#1a1a1a', borderRadius: 1, textarea: { color: 'white' } }}
                    InputLabelProps={{ style: { color: '#94a3b8' } }}
                />
                <Button
                    type="submit" fullWidth variant="contained"
                    sx={{ mt: 3, py: 1.5, bgcolor: '#e50914', fontWeight: 'bold', '&:hover': { bgcolor: '#b20710' } }}
                >
                    Save Movie
                </Button>
            </Box>
        </Paper>
    );
}