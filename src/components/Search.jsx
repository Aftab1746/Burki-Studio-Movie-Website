import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';
import { searchMovies } from '../api/MovieApi';

const Search = () => {
  const [query, setQuery] = useState('');
  const { setMovies, setLoading, setError, setSearchQuery, setTotalResults, clearError } =
    useMovieContext();
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    clearError();
    setSearchQuery(query);

    try {
      const data = await searchMovies(query);
      if (data.Response === 'True') {
        setMovies(data.Search);
        setTotalResults(parseInt(data.totalResults, 10));
        navigate('/search');
      } else {
        setMovies([]);
        setTotalResults(0);
        setError(data.Error || 'No movies found. Try a different title.');
        navigate('/search');
      }
    } catch (err) {
      setError('Something went wrong. Please check your connection and try again.');
      navigate('/search');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="search-form" onSubmit={handleSearch}>
      <div className="search-wrapper">
        <span className="search-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </span>
        <input
          type="text"
          className="search-input"
          placeholder="Search a movie title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          spellCheck="false"
        />
        {query && (
          <button
            type="button"
            className="search-clear"
            onClick={() => setQuery('')}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
        <button type="submit" className="search-btn" disabled={!query.trim()}>
          Search
        </button>
      </div>
    </form>
  );
};

export default Search;
