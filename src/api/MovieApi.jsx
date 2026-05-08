import axios from 'axios';

const API_KEY = '5c901951';
const BASE_URL = 'https://www.omdbapi.com/';

// Create axios instance with baseURL and default API key
const movieAxios = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,
  },
});

// Search movies by title query
export const searchMovies = async (query, page = 1) => {
  const response = await movieAxios.get('/', {
    params: {
      s: query,
      type: 'movie',
      page,
    },
  });
  return response.data;
};

// Get full movie details by IMDb ID
export const getMovieById = async (imdbID) => {
  const response = await movieAxios.get('/', {
    params: {
      i: imdbID,
      plot: 'full',
    },
  });
  return response.data;
};

export default movieAxios;
