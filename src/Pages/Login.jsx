import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/users?email=${credentials.email}&password=${credentials.password}`);
            const users = await response.json();

            if (users.length > 0) {
                localStorage.setItem("userData", JSON.stringify(users[0]));
                localStorage.setItem("userToken", "active_session");
                navigate("/profile");
            } else {
                alert("Invalid email or password!");
            }
        } catch (error) {
            console.error("Login error:", error);
            localStorage.setItem("userToken", "active_session");
            navigate("/profile");
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 10 }}>
            <Paper elevation={20} sx={{ p: 5, bgcolor: 'var(--bg-card)', color: 'white', borderRadius: 4, border: '1px solid #334155' }}>
                <Typography variant="h4" fontWeight="bold" align="center" sx={{ color: 'var(--accent-red)', mb: 2 }}>
                    Welcome Back
                </Typography>

                <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
                    <TextField
                        fullWidth label="Email Address" variant="filled" margin="normal" required type="email"
                        value={credentials.email}
                        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                        sx={{ bgcolor: '#334155', borderRadius: 1, input: { color: 'white' } }}
                        slotProps={{ inputLabel: { style: { color: '#94a3b8' } } }}
                    />

                    <TextField
                        fullWidth label="Password" type="password" variant="filled" margin="normal" required
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        sx={{ bgcolor: '#334155', borderRadius: 1, input: { color: 'white' } }}
                        slotProps={{ inputLabel: { style: { color: '#94a3b8' } } }}
                    />

                    <Button
                        type="submit" variant="contained" fullWidth
                        sx={{
                            mt: 4, py: 1.5, fontWeight: 'bold', fontSize: '1.1rem',
                            bgcolor: 'var(--accent-red)',
                            '&:hover': { bgcolor: '#b20710' }
                        }}>
                        Login to MovieVerse
                    </Button>

                    <Typography variant="body2" align="center" sx={{ mt: 3, color: '#94a3b8' }}>
                        Don't have an account?
                        <Button onClick={() => navigate('/register')} sx={{ color: 'var(--accent-red)', textTransform: 'none', fontWeight: 'bold' }}>
                            Register Now
                        </Button>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}