import React, { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { Container, TextField, Button, Typography, Paper, Box, Stack, MenuItem, FormControlLabel, Checkbox, FormGroup, Radio, RadioGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const { login } = useContext(UserContext);

    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: "",
        gender: "",
        preferredLanguage: "",
        interests: { action: false, comedy: false, drama: false, horror: false, sciFi: false }
    });

    const languages = ["English", "Arabic"];

    const handleInterestChange = (event) => {
        setUserData({
            ...userData,
            interests: { ...userData.interests, [event.target.name]: event.target.checked }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(userData);
        navigate("/profile");
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 10, mb: 10 }}>
            <Paper elevation={0} sx={{ p: 4, bgcolor: '#131415', color: 'white', borderRadius: 3, border: '1px solid #1e293b' }}>
                <Typography variant="h4" sx={{ color: '#e50914', fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
                    Join MovieVerse
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        <TextField
                            fullWidth label="Username" variant="filled" required
                            value={userData.username}
                            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                            sx={{ bgcolor: '#1a1a1a', borderRadius: 1, input: { color: 'white' } }}
                            InputLabelProps={{ style: { color: '#94a3b8' } }}
                        />

                        <TextField
                            fullWidth label="Email" type="email" variant="filled" required
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            sx={{ bgcolor: '#1a1a1a', borderRadius: 1, input: { color: 'white' } }}
                            InputLabelProps={{ style: { color: '#94a3b8' } }}
                        />

                        <Box>
                            <Typography variant="body1" sx={{ color: '#e50914', fontWeight: 'bold', mb: 0.5 }}>Gender:</Typography>
                            <RadioGroup row value={userData.gender} onChange={(e) => setUserData({ ...userData, gender: e.target.value })} sx={{ color: '#94a3b8' }}>
                                <FormControlLabel value="female" control={<Radio sx={{ color: '#334155', '&.Mui-checked': { color: '#e50914' } }} />} label="Female" />
                                <FormControlLabel value="male" control={<Radio sx={{ color: '#334155', '&.Mui-checked': { color: '#e50914' } }} />} label="Male" />
                            </RadioGroup>
                        </Box>

                        <TextField
                            select fullWidth label="Preferred Language" variant="filled"
                            value={userData.preferredLanguage}
                            onChange={(e) => setUserData({ ...userData, preferredLanguage: e.target.value })}
                            sx={{ bgcolor: '#1a1a1a', borderRadius: 1, '& .MuiSelect-select': { color: 'white' } }}
                            InputLabelProps={{ style: { color: '#94a3b8' } }}
                        >
                            {languages.map((option) => (<MenuItem key={option} value={option}>{option}</MenuItem>))}
                        </TextField>

                        <Box>
                            <Typography variant="body1" sx={{ color: '#e50914', fontWeight: 'bold', mb: 1 }}>Select Your Interests:</Typography>
                            <FormGroup sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                                {Object.keys(userData.interests).map((genre) => (
                                    <FormControlLabel
                                        key={genre}
                                        control={
                                            <Checkbox
                                                name={genre}
                                                checked={userData.interests[genre]}
                                                onChange={handleInterestChange}
                                                sx={{ color: '#334155', '&.Mui-checked': { color: '#e50914' } }}
                                            />
                                        }
                                        label={<Typography sx={{ textTransform: 'capitalize', color: '#94a3b8' }}>{genre}</Typography>}
                                    />
                                ))}
                            </FormGroup>
                        </Box>

                        <Button
                            type="submit" fullWidth variant="contained"
                            sx={{ py: 1.5, bgcolor: '#e50914', fontWeight: 'bold', fontSize: '1.1rem', '&:hover': { bgcolor: '#b20710' } }}
                        >
                            Create Account
                        </Button>
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
}