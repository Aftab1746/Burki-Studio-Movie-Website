import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById } from '../api/MovieApi';

const PLACEHOLDER_IMG =
  'https://via.placeholder.com/400x590/111117/D4AF37?text=No+Poster';

const RatingBadge = ({ source, value }) => (
  <div className="rating-badge">
    <span className="rating-badge__value">{value}</span>
    <span className="rating-badge__source">{source}</span>
  </div>
);

const MoviePage = () => {
  const { imdbID } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMovieById(imdbID);
        if (data.Response === 'True') {
          setMovie(data);
        } else {
          setError(data.Error || 'Movie not found.');
        }
      } catch {
        setError('Failed to load movie details. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [imdbID]);

  if (loading) {
    return (
      <div className="movie-page">
        <div className="state-container">
          <div className="loader">
            <div className="loader__reel">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="loader__dot" style={{ '--i': i }} />
              ))}
            </div>
            <p className="loader__text">Loading movie details…</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movie-page">
        <div className="state-container">
          <div className="error-state">
            <span className="error-state__icon">😞</span>
            <h2 className="error-state__title">Oops!</h2>
            <p className="error-state__message">{error}</p>
            <button className="btn btn--primary" onClick={() => navigate(-1)}>
              ← Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) return null;

  const poster = movie.Poster !== 'N/A' ? movie.Poster : PLACEHOLDER_IMG;
  const genres = movie.Genre ? movie.Genre.split(', ') : [];
  const imdbRating = movie.Ratings?.find((r) => r.Source === 'Internet Movie Database');
  const rtRating = movie.Ratings?.find((r) => r.Source === 'Rotten Tomatoes');
  const mcRating = movie.Ratings?.find((r) => r.Source === 'Metacritic');

  return (
    <div className="movie-page">
      {/* Blurred background art */}
      <div
        className="movie-page__bg"
        style={{ backgroundImage: `url(${poster})` }}
        aria-hidden="true"
      />
      <div className="movie-page__bg-overlay" aria-hidden="true" />

      <div className="container movie-page__container">
        {/* Back Button */}
        <button className="btn btn--back" onClick={() => navigate(-1)}>
          ← Back to Results
        </button>

        <div className="movie-detail">
          {/* Poster */}
          <div className="movie-detail__poster-col">
            <div className="movie-detail__poster-frame">
              <img
                src={poster}
                alt={movie.Title}
                className="movie-detail__poster"
                onError={(e) => {
                  e.target.src = PLACEHOLDER_IMG;
                }}
              />
            </div>
          </div>

          {/* Info */}
          <div className="movie-detail__info-col">
            {/* Title & Meta */}
            <div className="movie-detail__header">
              <h1 className="movie-detail__title">{movie.Title}</h1>
              <div className="movie-detail__meta">
                <span className="meta-chip">{movie.Year}</span>
                <span className="meta-chip">{movie.Rated}</span>
                <span className="meta-chip">{movie.Runtime}</span>
              </div>
            </div>

            {/* Genres */}
            <div className="movie-detail__genres">
              {genres.map((g) => (
                <span key={g} className="genre-tag">{g}</span>
              ))}
            </div>

            {/* Ratings */}
            {(imdbRating || rtRating || mcRating) && (
              <div className="movie-detail__ratings">
                {imdbRating && (
                  <RatingBadge source="IMDb" value={imdbRating.Value} />
                )}
                {rtRating && (
                  <RatingBadge source="Rotten Tomatoes" value={rtRating.Value} />
                )}
                {mcRating && (
                  <RatingBadge source="Metacritic" value={mcRating.Value} />
                )}
              </div>
            )}

            {/* Plot */}
            {movie.Plot && movie.Plot !== 'N/A' && (
              <div className="movie-detail__section">
                <h3 className="movie-detail__section-title">Plot</h3>
                <p className="movie-detail__plot">{movie.Plot}</p>
              </div>
            )}

            {/* Cast & Crew */}
            <div className="movie-detail__section">
              <h3 className="movie-detail__section-title">Cast & Crew</h3>
              <div className="detail-rows">
                {movie.Director && movie.Director !== 'N/A' && (
                  <div className="detail-row">
                    <span className="detail-row__label">Director</span>
                    <span className="detail-row__value">{movie.Director}</span>
                  </div>
                )}
                {movie.Writer && movie.Writer !== 'N/A' && (
                  <div className="detail-row">
                    <span className="detail-row__label">Writer</span>
                    <span className="detail-row__value">{movie.Writer}</span>
                  </div>
                )}
                {movie.Actors && movie.Actors !== 'N/A' && (
                  <div className="detail-row">
                    <span className="detail-row__label">Starring</span>
                    <span className="detail-row__value">{movie.Actors}</span>
                  </div>
                )}
                {movie.Language && movie.Language !== 'N/A' && (
                  <div className="detail-row">
                    <span className="detail-row__label">Language</span>
                    <span className="detail-row__value">{movie.Language}</span>
                  </div>
                )}
                {movie.Country && movie.Country !== 'N/A' && (
                  <div className="detail-row">
                    <span className="detail-row__label">Country</span>
                    <span className="detail-row__value">{movie.Country}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Awards */}
            {movie.Awards && movie.Awards !== 'N/A' && (
              <div className="movie-detail__awards">
                <span className="awards-icon">🏆</span>
                <span className="awards-text">{movie.Awards}</span>
              </div>
            )}

            {/* IMDb Link */}
            <a
              href={`https://www.imdb.com/title/${movie.imdbID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
            >
              View on IMDb ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
