import { useMovieContext } from '../context/MovieContext';
import Movie from '../components/Movie';
import Search from '../components/Search';

const SearchPage = () => {
  const { movies, loading, error, searchQuery, totalResults } = useMovieContext();

  return (
    <div className="search-page">
      <div className="container">
        {/* Re-search bar at the top of results */}
        <div className="search-page__top">
          <Search />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="state-container">
            <div className="loader">
              <div className="loader__reel">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="loader__dot" style={{ '--i': i }} />
                ))}
              </div>
              <p className="loader__text">Searching for "{searchQuery}"…</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="state-container">
            <div className="error-state">
              <span className="error-state__icon">🎬</span>
              <h2 className="error-state__title">No Results Found</h2>
              <p className="error-state__message">{error}</p>
              <p className="error-state__hint">
                Double-check the spelling or try a different title.
              </p>
            </div>
          </div>
        )}

        {/* Results */}
        {!loading && !error && movies.length > 0 && (
          <>
            <div className="search-page__header">
              <h2 className="search-page__results-title">
                Results for{' '}
                <span className="accent">"{searchQuery}"</span>
              </h2>
              <p className="search-page__count">
                {totalResults.toLocaleString()} movies found
              </p>
            </div>
            <div className="movies-grid">
              {movies.map((movie) => (
                <Movie key={movie.imdbID} movie={movie} />
              ))}
            </div>
          </>
        )}

        {/* Empty initial state */}
        {!loading && !error && movies.length === 0 && !searchQuery && (
          <div className="state-container">
            <div className="empty-state">
              <span className="empty-state__icon">🔍</span>
              <h2 className="empty-state__title">Start Your Search</h2>
              <p className="empty-state__message">
                Type a movie name above and press Search.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
