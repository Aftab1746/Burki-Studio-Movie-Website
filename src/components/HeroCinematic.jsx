import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMovieById } from '../api/MovieApi';

/* ─────────────────────────────────────────────────────────
   Curated list of IMDb IDs – random one chosen per refresh
───────────────────────────────────────────────────────── */
const FEATURED_IDS = [
  'tt1375666', // Inception
  'tt0468569', // The Dark Knight
  'tt0816692', // Interstellar
  'tt0111161', // The Shawshank Redemption
  'tt0110912', // Pulp Fiction
  'tt0068646', // The Godfather
  'tt0137523', // Fight Club
  'tt0133093', // The Matrix
  'tt4154796', // Avengers: Endgame
  'tt6751668', // Parasite
  'tt7286456', // Joker
  'tt8579674', // 1917
  'tt15398776', // Oppenheimer
  'tt1160419', // Dune: Part One
  'tt1745960', // Top Gun: Maverick
  'tt10872600', // Spider-Man: No Way Home
  'tt1856101', // Blade Runner 2049
  'tt1392190', // Mad Max: Fury Road
  'tt2582802', // Whiplash
  'tt3783958', // La La Land
  'tt5013056', // Dunkirk
  'tt4633694', // Spider-Man: Into the Spider-Verse
  'tt6966692', // Green Book
  'tt7286456', // Joker
  'tt9114286', // Black Panther: Wakanda Forever
];

/* ─────────────────────────────────────────────────────────
   Star Rating Display
───────────────────────────────────────────────────────── */
const StarRating = ({ rating }) => {
  const num = parseFloat(rating);
  const filled = Math.round(num / 2);

  return (
    <div className="hero-stars" aria-label={`Rating: ${rating} out of 10`}>
      {[...Array(5)].map((_, i) => (
        <span key={i} className={`star ${i < filled ? 'star--filled' : ''}`} aria-hidden="true">
          ★
        </span>
      ))}
      <span className="hero-rating-num">{rating} / 10</span>
      <span className="hero-rating-source">IMDb</span>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   Shimmer Skeleton (shown while fetching movie data)
───────────────────────────────────────────────────────── */
const HeroSkeleton = () => (
  <section className="hero-cinematic" aria-busy="true" aria-label="Loading featured movie">
    <div className="hero-backdrop hero-backdrop--skeleton" aria-hidden="true" />
    <div className="hero-gradient-overlay" aria-hidden="true" />
    <div className="container hero-cinematic__inner">
      <div className="hero-cinematic__content">
        <div className="shimmer sk-badge" />
        <div className="shimmer sk-title" />
        <div className="shimmer sk-title sk-title--short" />
        <div className="shimmer sk-stars" />
        <div className="shimmer sk-meta" />
        <div className="shimmer sk-genres" />
        <div className="shimmer sk-text" />
        <div className="shimmer sk-text sk-text--short" />
        <div className="sk-btns">
          <div className="shimmer sk-btn" />
          <div className="shimmer sk-btn sk-btn--sm" />
        </div>
      </div>
      <div className="shimmer sk-poster" />
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────
   Main Cinematic Hero Component
───────────────────────────────────────────────────────── */
const HeroCinematic = () => {
  const [movie, setMovie]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const navigate              = useNavigate();

  // Stable random ID – chosen once per mount
  const randomId = useRef(
    FEATURED_IDS[Math.floor(Math.random() * FEATURED_IDS.length)]
  );

  useEffect(() => {
    let cancelled = false;

    const fetchFeaturedMovie = async () => {
      setLoading(true);
      setVisible(false);

      try {
        const data = await getMovieById(randomId.current);
        if (!cancelled && data.Response === 'True') {
          setMovie(data);
          // Small delay so the backdrop image has time to load before reveal
          setTimeout(() => !cancelled && setVisible(true), 120);
        }
      } catch {
        // Silently fail; skeleton remains
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchFeaturedMovie();
    return () => { cancelled = true; };
  }, []);

  // ── Loading state ──────────────────────────────────────
  if (loading) return <HeroSkeleton />;
  if (!movie)  return null;

  // ── Derived data ───────────────────────────────────────
  const poster      = movie.Poster !== 'N/A' ? movie.Poster : null;
  const genres      = movie.Genre  !== 'N/A' ? movie.Genre.split(', ').slice(0, 3) : [];
  const imdbRating  = movie.imdbRating !== 'N/A' ? movie.imdbRating : null;
  const rawOverview = movie.Plot !== 'N/A' ? movie.Plot : '';
  const overview    = rawOverview.length > 200
    ? rawOverview.slice(0, 200).trim() + '…'
    : rawOverview;

  return (
    <section
      className={`hero-cinematic ${visible ? 'hero-cinematic--visible' : ''}`}
      aria-label={`Featured movie: ${movie.Title}`}
    >
      {/* ── Cinematic blurred backdrop ── */}
      {poster && (
        <div
          className="hero-backdrop"
          style={{ backgroundImage: `url(${poster})` }}
          aria-hidden="true"
        />
      )}

      {/* ── Multi-layered gradient overlays ── */}
      <div className="hero-gradient-overlay" aria-hidden="true" />
      <div className="hero-vignette"         aria-hidden="true" />

      {/* ── Animated floating particles ── */}
      <div className="hero-particles" aria-hidden="true">
        {[...Array(8)].map((_, i) => (
          <span key={i} className={`hero-particle hero-particle--${i + 1}`} />
        ))}
      </div>

      {/* ── Main content layout ── */}
      <div className="container hero-cinematic__inner">

        {/* LEFT: Text content */}
        <div className="hero-cinematic__content">

          {/* Live badge */}
          <div className="hero-badge" aria-label="Featured today">
            <span className="hero-badge__dot" aria-hidden="true" />
            <span>Featured Today</span>
          </div>

          {/* Movie title */}
          <h1 className="hero-cinematic__title">{movie.Title}</h1>

          {/* IMDb Star Rating */}
          {imdbRating && <StarRating rating={imdbRating} />}

          {/* Year / Rating / Runtime chips */}
          <div className="hero-meta" aria-label="Movie details">
            {movie.Year    && movie.Year    !== 'N/A' && (
              <span className="hero-meta__chip">{movie.Year}</span>
            )}
            {movie.Rated   && movie.Rated   !== 'N/A' && (
              <span className="hero-meta__chip hero-meta__chip--rated">{movie.Rated}</span>
            )}
            {movie.Runtime && movie.Runtime !== 'N/A' && (
              <span className="hero-meta__chip">{movie.Runtime}</span>
            )}
          </div>

          {/* Genre pills */}
          {genres.length > 0 && (
            <div className="hero-genres" aria-label="Genres">
              {genres.map((g) => (
                <span key={g} className="hero-genre-tag">{g}</span>
              ))}
            </div>
          )}

          {/* Short overview */}
          {overview && (
            <p className="hero-overview">{overview}</p>
          )}

          {/* Action buttons */}
          <div className="hero-actions">
            <button
              className="hero-btn hero-btn--primary"
              onClick={() => navigate(`/movie/${movie.imdbID}`)}
              aria-label={`Watch ${movie.Title}`}
            >
              {/* Play icon */}
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch Now
            </button>

            <button
              className="hero-btn hero-btn--secondary"
              onClick={() => navigate(`/movie/${movie.imdbID}`)}
              aria-label={`More info about ${movie.Title}`}
            >
              {/* Info icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                   width="18" height="18" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="8" />
                <line x1="12" y1="12" x2="12" y2="16" />
              </svg>
              More Info
            </button>
          </div>
        </div>

        {/* RIGHT: Floating poster card */}
        {poster && (
          <div className="hero-poster-wrap" aria-hidden="true">
            <div className="hero-poster-glow" />
            <div className="hero-poster-reflection" />
            <img
              src={poster}
              alt=""
              className="hero-poster"
              loading="eager"
              draggable="false"
            />
            {/* Gold corner accent */}
            <div className="hero-poster-corner hero-poster-corner--tl" />
            <div className="hero-poster-corner hero-poster-corner--br" />
          </div>
        )}
      </div>

      {/* ── Bottom fade into next section ── */}
      <div className="hero-bottom-fade" aria-hidden="true" />

      {/* ── Scroll hint ── */}
      <div className="hero-scroll-hint" aria-hidden="true">
        <span className="hero-scroll-hint__line" />
        <span className="hero-scroll-hint__text">Scroll</span>
      </div>
    </section>
  );
};

export default HeroCinematic;
