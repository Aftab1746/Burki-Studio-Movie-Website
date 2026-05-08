import { createContext, useContext, useState } from 'react';

// Create the context — export so components can use it directly if needed
export const MovieContext = createContext();

// Provider component — wraps the entire app
export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalResults, setTotalResults] = useState(0);

  const clearError = () => setError(null);
  const clearMovies = () => {
    setMovies([]);
    setTotalResults(0);
    setSearchQuery('');
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        loading,
        setLoading,
        error,
        setError,
        clearError,
        searchQuery,
        setSearchQuery,
        totalResults,
        setTotalResults,
        clearMovies,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

// Custom hook for easy context consumption
export const useMovieContext = () => useContext(MovieContext);
