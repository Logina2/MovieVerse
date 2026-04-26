import React, { createContext, useState, useEffect } from "react";

export const MovieContext = createContext();

const MovieContextProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/movies")
            .then((res) => res.json())
            .then((data) => setMovies(data))
            .catch((err) => console.log("Fetch error:", err));
    }, []);

    const deleteMovie = (id) => {
        fetch(`http://localhost:5000/movies/${id}`, { method: "DELETE" })
            .then((res) => {
                if (res.ok) setMovies((prev) => prev.filter((m) => m.id != id));
            });
    };

    const addMovie = (movieData) => {
        return fetch("http://localhost:5000/movies", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(movieData),
        })
            .then((res) => res.json())
            .then((newMovie) => setMovies((prev) => [...prev, newMovie]));
    };

    return (
        <MovieContext.Provider value={{ movies, deleteMovie, addMovie }}>
            {children}
        </MovieContext.Provider>
    );
};

export default MovieContextProvider;