import React, { createContext, useState, useEffect } from "react";

export const MovieContext = createContext();

const API_KEY = "api_key=9813ce01a72ca1bd2ae25f091898b1c7";
const URL = "https://api.themoviedb.org/3";
const IMG_PATH = "https://image.tmdb.org/t/p/w500/";

const MovieContextProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [trending, setTrending] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGenres();
        fetchPopular();
        fetchTrending();
        fetchTopRated();
    }, []);

    const fetchGenres = async () => {
        try {
            const res = await fetch(`${URL}/genre/movie/list?${API_KEY}`);
            const data = await res.json();
            setGenres(data.genres || []);
        } catch (err) {
            console.log("Genre fetch error:", err);
        }
    };

    const getGenreName = (genreIds) => {
        if (!genreIds || genreIds.length === 0) return "General";
        const genre = genres.find((g) => g.id === genreIds[0]);
        return genre ? genre.name : "General";
    };

    const formatMovie = (movie) => ({
        ...movie,
        image: movie.poster_path ? IMG_PATH + movie.poster_path : null,
        backdrop: movie.backdrop_path ? IMG_PATH + movie.backdrop_path : null,
        rating: movie.vote_average ? Number(movie.vote_average).toFixed(1) : "N/A",
        category: getGenreName(movie.genre_ids || movie.genres?.map((g) => g.id)),
        description: movie.overview || "No description provided.",
        releaseYear: movie.release_date ? movie.release_date.split("-")[0] : "N/A",
    });

    const fetchPopular = async () => {
        try {
            const res = await fetch(`${URL}/discover/movie?sort_by=popularity.desc&${API_KEY}`);
            const data = await res.json();
            const formatted = (data.results || []).map(formatMovie);
            setMovies(formatted);
        } catch (err) {
            console.log("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchTrending = async () => {
        try {
            const res = await fetch(`${URL}/trending/movie/week?${API_KEY}`);
            const data = await res.json();
            const formatted = (data.results || []).map(formatMovie);
            setTrending(formatted);
        } catch (err) {
            console.log("Trending fetch error:", err);
        }
    };

    const fetchTopRated = async () => {
        try {
            const res = await fetch(`${URL}/movie/top_rated?${API_KEY}`);
            const data = await res.json();
            const formatted = (data.results || []).map(formatMovie);
            setTopRated(formatted);
        } catch (err) {
            console.log("Top rated fetch error:", err);
        }
    };

    const fetchMoviesByCategory = async (category) => {
        if (category === "All") {
            fetchPopular();
            return;
        }
        try {
            const genre = genres.find((g) => g.name === category);
            if (!genre) return;
            const res = await fetch(`${URL}/discover/movie?with_genres=${genre.id}&${API_KEY}`);
            const data = await res.json();
            const formatted = (data.results || []).map(formatMovie);
            setMovies(formatted);
        } catch (err) {
            console.log("Category fetch error:", err);
        }
    };

    const fetchMovieById = async (id) => {
        try {
            const res = await fetch(`${URL}/movie/${id}?${API_KEY}&append_to_response=credits,videos`);
            const data = await res.json();
            return {
                ...data,
                image: data.poster_path ? IMG_PATH + data.poster_path : null,
                backdrop: data.backdrop_path ? IMG_PATH + data.backdrop_path : null,
                rating: data.vote_average ? Number(data.vote_average).toFixed(1) : "N/A",
                category: data.genres?.[0]?.name || "General",
                description: data.overview || "No description provided.",
                releaseYear: data.release_date ? data.release_date.split("-")[0] : "N/A",
                runtime: data.runtime ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m` : "N/A",
                cast: data.credits?.cast?.slice(0, 8) || [],
                genres: data.genres || [],
            };
        } catch (err) {
            console.log("Movie detail fetch error:", err);
            return null;
        }
    };

    const fetchRecommendations = async (id) => {
        try {
            const res = await fetch(`${URL}/movie/${id}/recommendations?${API_KEY}`);
            const data = await res.json();
            return (data.results || []).slice(0, 6).map(formatMovie);
        } catch (err) {
            console.log("Recommendations fetch error:", err);
            return [];
        }
    };

    const deleteMovie = (id) => {
        setMovies((prev) => prev.filter((m) => m.id !== id));
    };

    const addMovie = (movieData) => {
        setMovies((prev) => [...prev, movieData]);
    };

    return (
        <MovieContext.Provider value={{
            movies, trending, topRated, loading,
            deleteMovie, addMovie, fetchMovieById,
            fetchMoviesByCategory, fetchRecommendations,
        }}>
            {children}
        </MovieContext.Provider>
    );
};

export default MovieContextProvider;
