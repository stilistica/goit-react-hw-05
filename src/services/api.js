// KEY: eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMDE4YTIyMmY0NTU2OTEwYzRhNzVmYWIwMzA0ZjU1YyIsIm5iZiI6MTc0NDgwOTEyMi4wMzUsInN1YiI6IjY3ZmZhY2EyYzc3ZmQxZGY3NGFjZWE0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0_IT9HPvNl1DQtX0Rr7D0_pwIX9V4gy4XLolz1QGkyM
import axios from "axios";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMDE4YTIyMmY0NTU2OTEwYzRhNzVmYWIwMzA0ZjU1YyIsIm5iZiI6MTc0NDgwOTEyMi4wMzUsInN1YiI6IjY3ZmZhY2EyYzc3ZmQxZGY3NGFjZWE0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0_IT9HPvNl1DQtX0Rr7D0_pwIX9V4gy4XLolz1QGkyM";
const options = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const fetchTrendingMovie = async (page, signal) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}`,
    {
      ...options,
      signal,
    }
  );
  return response.data.results;
};

export const fetchSearchMovie = async (query, page, signal) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
    {
      ...options,
      signal,
    }
  );
  return response.data.results;
};

export const fetchMovieById = async (movieId, signal) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    {
      ...options,
      signal,
    }
  );
  return response.data;
};

export const fetchCast = async (movieId, signal) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
    {
      ...options,
      signal,
    }
  );
  return response.data;
};

export const fetchReviews = async (movieId, signal) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`,
    {
      ...options,
      signal,
    }
  );
  return response.data;
};
