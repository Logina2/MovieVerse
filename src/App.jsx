import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline, Box } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./Redux/Store";
import MovieContextProvider from "./Context/MovieContext";
import UserContextProvider from "./Context/UserContext";
import NavComponent from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import Landing from "./Pages/Landing";
import MovieDetails from "./Pages/MovieDetails";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import Watchlist from "./Pages/Watchlist";
import NotFound from "./Pages/NotFound";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#e50914' },
    background: { default: '#000000', paper: '#141414' },
  },
});

function MainLayout() {
  return (
    <>
      <Landing />
      <Box id="movies-section">
        <Home />
      </Box>
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <UserContextProvider>
        <MovieContextProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <BrowserRouter>
              <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

                <NavComponent />
                <Box component="main" sx={{ flexGrow: 1 }}>
                  <Routes>
                    <Route path="/" element={<MainLayout />} />
                    <Route path="/movies/:id" element={<MovieDetails />} />
                    <Route path="/join" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/watchlist" element={<Watchlist />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Box>

                <Footer />
              </Box>
            </BrowserRouter>
          </ThemeProvider>
        </MovieContextProvider>
      </UserContextProvider>
    </Provider>
  );
}

export default App;