import React, { useState, useContext } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    InputBase,
    Box,
    IconButton,
    Badge,
    Button,
    Container,
    Avatar,
    Stack
} from "@mui/material";
import { MovieFilter, Search, Bookmark, Person } from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MovieContext } from "../Context/MovieContext";
import { UserContext } from "../Context/UserContext";

const SearchBox = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: "20px",
    backgroundColor: alpha(theme.palette.common.white, 0.1),
    "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.15) },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    width: "100%",
    [theme.breakpoints.up("sm")]: { width: "300px" },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#e50914"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
    },
}));

export default function NavComponent() {
    const { user } = useContext(UserContext);
    const { movies } = useContext(MovieContext);
    const watchlistItems = useSelector((state) => state.watchlist.items);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        if (e.key === "Enter" && query.trim()) {
            navigate(`/?search=${query}`);
        }
    };

    return (
        <AppBar position="fixed" sx={{ bgcolor: "rgba(0,0,0,0.9)", backdropFilter: "blur(10px)" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Stack direction="row" spacing={1} component={Link} to="/" sx={{ textDecoration: "none", alignItems: "center" }}>
                        <MovieFilter sx={{ color: "#e50914", fontSize: 30 }} />
                        <Typography variant="h6" fontWeight="bold" sx={{ color: "white", display: { xs: "none", sm: "block" } }}>
                            MOVIE<span style={{ color: "#e50914" }}>VERSE</span>
                        </Typography>
                    </Stack>

                    <SearchBox>
                        <SearchIconWrapper><Search /></SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search movies..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleSearch}
                        />
                    </SearchBox>

                    <Box sx={{ flexGrow: 1 }} />

                    <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 2 } }}>
                        <IconButton component={Link} to="/watchlist" color="inherit">
                            <Badge badgeContent={watchlistItems.length} color="error"><Bookmark /></Badge>
                        </IconButton>

                        {user ? (
                            <IconButton component={Link} to="/profile" color="inherit">
                                <Avatar sx={{ bgcolor: "#e50914", width: 35, height: 35, fontSize: "1rem" }}>
                                    {user.username[0].toUpperCase()}
                                </Avatar>
                            </IconButton>
                        ) : (
                            <Button
                                component={Link}
                                to="/join"
                                variant="contained"
                                color="error"
                                sx={{ borderRadius: "20px", textTransform: "none", fontWeight: "bold" }}
                            >
                                Join Us
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}