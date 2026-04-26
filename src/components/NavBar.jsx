import React, { useState, useContext } from "react";
import { AppBar, Toolbar, Typography, InputBase, Box, IconButton, Badge, Button, Container } from "@mui/material";
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
    color: "white",
    width: "100%",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        fontSize: "0.9rem",
        "&::placeholder": { color: "white", opacity: 0.7 },
    },
}));

export default function NavComponent() {
    const navigate = useNavigate();

    const { user } = useContext(UserContext);

    const [query, setQuery] = useState("");
    const watchCount = useSelector((state) => state.watchlist.items.length);

    const handleSearch = (e) => {
        if (e.key === "Enter") {
            navigate(`/?search=${query}`);
        }
    };

    return (
        <AppBar position="sticky" sx={{ bgcolor: "rgba(0,0,0,0.9)", backdropFilter: "blur(10px)", borderBottom: "1px solid #333" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box component={Link} to="/" onClick={() => window.scrollTo(0, 0)} sx={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }}>
                        <MovieFilter sx={{ color: "#e50914", fontSize: { xs: 28, md: 32 }, mr: 1 }} />
                        <Typography variant="h6" sx={{ fontWeight: 900, display: { xs: "none", sm: "block" } }}>
                            MOVIE<span style={{ color: "#e50914" }}>VERSE</span>
                        </Typography>
                    </Box>

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

                    <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, md: 2 } }}>
                        <IconButton component={Link} to="/watchlist" color="inherit">
                            <Badge badgeContent={watchCount} color="error"><Bookmark /></Badge>
                        </IconButton>

                        <IconButton component={Link} to={user ? "/profile" : "/join"} color="inherit">
                            <Person />
                        </IconButton>

                        {!user && (
                            <Button component={Link} to="/join" variant="contained" color="error" sx={{ borderRadius: "20px", textTransform: "none", fontWeight: "bold", display: { xs: "none", md: "inline-flex" } }}>
                                Join Us
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}