import React, { useContext } from "react";
import { Container, Typography, Paper, Box, Avatar, Divider, Button } from "@mui/material";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";

export default function Profile() {
    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    if (!user) {
        return (
            <Container sx={{ mt: 15, textAlign: "center", color: "white" }}>
                <Typography variant="h5">Please register to see your profile.</Typography>
                <Button component={navigate} onClick={() => navigate("/join")} color="error" sx={{ mt: 2 }}>
                    Go to Register
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 15, mb: 10 }}>
            <Paper sx={{ p: 4, bgcolor: '#131415', color: 'white', borderRadius: 3, border: '1px solid #1e293b', textAlign: 'center' }}>
                <Avatar sx={{ width: 100, height: 100, bgcolor: '#e50914', mx: 'auto', mb: 2, fontSize: "2.5rem" }}>
                    {user.username[0].toUpperCase()}
                </Avatar>
                <Typography variant="h4" fontWeight="bold">{user.username}</Typography>
                <Typography variant="body1" sx={{ color: '#94a3b8', mb: 3 }}>{user.email}</Typography>

                <Divider sx={{ bgcolor: "#1e293b", mb: 3 }} />

                <Box sx={{ textAlign: "left", display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
                    <Typography><strong>Gender:</strong> {user.gender}</Typography>
                    <Typography><strong>Language:</strong> {user.preferredLanguage}</Typography>
                    <Typography><strong>Interests:</strong> {Object.keys(user.interests).filter(i => user.interests[i]).join(", ") || "None"}</Typography>
                </Box>

                <Button
                    variant="outlined"
                    color="error"
                    fullWidth
                    startIcon={<Logout />}
                    onClick={handleLogout}
                    sx={{ borderRadius: "25px", fontWeight: "bold" }}
                >
                    Logout
                </Button>
            </Paper>
        </Container>
    );
}