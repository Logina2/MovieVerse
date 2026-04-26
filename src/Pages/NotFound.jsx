import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="text-center mt-5">
            <h1>404</h1>
            <h3>Page Not Found</h3>
            <Link to="/" className="btn btn-primary mt-3">
                Go Home
            </Link>
        </div>
    );
}