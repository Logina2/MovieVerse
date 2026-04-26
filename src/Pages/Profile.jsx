import React, { useContext } from "react";
import { Container, Typography, Paper, Box, Avatar, Divider } from "@mui/material";
import { UserContext } from "../Context/UserContext";

export default function Profile() {
    const { user } = useContext(UserContext);

    if (!user) {
        return (
            <Container sx={{ mt: 15, textAlign: "center", color: "white" }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    Please register to see your profile.
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 15, mb: 10 }}>
            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    bgcolor: '#131415',
                    color: 'white',
                    borderRadius: 3,
                    border: '1px solid #1e293b',
                    textAlign: 'center'
                }}
            >
                <Avatar
                    sx={{
                        width: 100,
                        height: 100,
                        bgcolor: '#e50914',
                        mx: 'auto',
                        mb: 2,
                        fontSize: "2.5rem",
                        fontWeight: 'bold'
                    }}
                >
                    {user.username ? user.username[0].toUpperCase() : "U"}
                </Avatar>

                <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5 }}>
                    {user.username}
                </Typography>

                <Typography variant="body1" sx={{ color: '#94a3b8', mb: 3 }}>
                    {user.email}
                </Typography>

                <Divider sx={{ bgcolor: "#1e293b", mb: 3 }} />

                <Box sx={{ textAlign: "left", display: "flex", flexDirection: "column", gap: 2, px: 2 }}>
                    <Typography variant="body1">
                        <strong style={{ color: '#e50914' }}>Gender:</strong> {user.gender}
                    </Typography>

                    <Typography variant="body1">
                        <strong style={{ color: '#e50914' }}>Language:</strong> {user.preferredLanguage}
                    </Typography>

                    <Typography variant="body1">
                        <strong style={{ color: '#e50914' }}>Interests:</strong>
                        <span style={{ textTransform: 'capitalize', marginLeft: '8px' }}>
                            {user.interests
                                ? Object.keys(user.interests).filter(i => user.interests[i]).join(", ")
                                : "No interests selected"}
                        </span>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}