import { useNavigate } from 'react-router-dom';

const PLACEHOLDER_IMG =
  'https://via.placeholder.com/300x445/111117/D4AF37?text=No+Poster';

const Movie = ({ movie }) => {
  const navigate = useNavigate();
  const poster = movie.Poster !== 'N/A' ? movie.Poster : PLACEHOLDER_IMG;

  return (
    <div
      className="movie-card"
      onClick={() => navigate(`/movie/${movie.imdbID}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/movie/${movie.imdbID}`)}
      aria-label={`View details for ${movie.Title}`}
    >
      <div className="movie-card__poster-wrap">
        <img
          src={poster}
          alt={movie.Title}
          className="movie-card__poster"
          loading="lazy"
          onError={(e) => {
            e.target.src = PLACEHOLDER_IMG;
          }}
        />
        <div className="movie-card__overlay">
          <span className="movie-card__cta">View Details</span>
        </div>
        <div className="movie-card__year-badge">{movie.Year}</div>
      </div>
      <div className="movie-card__info">
        <h3 className="movie-card__title">{movie.Title}</h3>
        <span className="movie-card__type">{movie.Type}</span>
      </div>
    </div>
  );
};

export default Movie;
