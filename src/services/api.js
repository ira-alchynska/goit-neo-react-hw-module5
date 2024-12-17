import axios from 'axios';

const API_READ_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTcyM2UzNmNiZDgzNjcyMjQ1MWQ1NzIwYmNlMWYwOCIsIm5iZiI6MTcyNDQ5NTg1NS40ODExOTksInN1YiI6IjY2YzlhZWUwOTdlMzU1Nzk4ZDBkMjk3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z2NsdwCvUB07f0v365_UzyFTeD0YEZHalQ8hzxACoyU'; // Replace with correct token
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
    },
});

export const fetchTrendingMovies = () =>
    api.get('/trending/movie/day')
        .then((res) => res.data.results)
        .catch((err) => {
            console.error("Error Fetching Trending Movies:", err.response?.data);
        });

export const searchMovies = (query) =>
    api.get('/search/movie', { params: { query } })
        .then((res) => res.data.results)
        .catch((err) => {
            console.error("Error Searching Movies:", err.response?.data);
        });

export const fetchMovieDetails = (movieId) =>
    api.get(`/movie/${movieId}`)
        .then((res) => res.data)
        .catch((err) => {
            console.error("Error Fetching Movie Details:", err.response?.data);
        });

export const fetchMovieCredits = (movieId) =>
    api.get(`/movie/${movieId}/credits`)
        .then((res) => res.data.cast)
        .catch((err) => {
            console.error("Error Fetching Movie Credits:", err.response?.data);
        });

export const fetchMovieReviews = (movieId) =>
    api.get(`/movie/${movieId}/reviews`)
        .then((res) => res.data.results)
        .catch((err) => {
            console.error("Error Fetching Movie Reviews:", err.response?.data);
        });

export { IMAGE_BASE_URL };
