import HeroCinematic from './HeroCinematic';
import Search from './Search';

/* ─────────────────────────────────────────────────────────
   Genre data with emoji icons
───────────────────────────────────────────────────────── */
const FEATURED_GENRES = [
  { label: 'Action',   icon: '⚡' },
  { label: 'Drama',    icon: '🎭' },
  { label: 'Sci-Fi',   icon: '🚀' },
  { label: 'Thriller', icon: '🔪' },
  { label: 'Comedy',   icon: '😄' },
  { label: 'Horror',   icon: '👻' },
  { label: 'Romance',  icon: '❤️' },
  { label: 'Crime',    icon: '🕵️' },
];

/* ─────────────────────────────────────────────────────────
   Feature highlights data
───────────────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: '🎬',
    title: 'Millions of Titles',
    desc: 'Access a vast database of movies, series, and short films from every era.',
  },
  {
    icon: '⭐',
    title: 'IMDb Ratings',
    desc: 'Get accurate ratings and reviews from the world\'s biggest movie database.',
  },
  {
    icon: '🎭',
    title: 'Full Cast & Crew',
    desc: 'Discover directors, writers, and every actor behind the lens.',
  },
];

/* ─────────────────────────────────────────────────────────
   Home Page
───────────────────────────────────────────────────────── */
const Home = () => (
  <div className="home">

    {/* Full-screen Cinematic Hero */}
    <HeroCinematic />

    {/* Search Section */}
    <section className="home-search-section">
      <div className="container">
        <p className="home-search-label">
          <span className="home-search-label__line" aria-hidden="true" />
          Search Any Movie
          <span className="home-search-label__line" aria-hidden="true" />
        </p>
        <Search />
        <div className="hero__hint">
          <span>Try:</span>
          {['Inception', 'The Godfather', 'Interstellar', 'Parasite'].map((s) => (
            <span key={s} className="hero__hint-tag">{s}</span>
          ))}
        </div>
      </div>
    </section>

    {/* Genre Pills Section */}
    <section className="genres">
      <div className="container">
        <h2 className="section-title">Browse by Genre</h2>
        <div className="genres__grid">
          {FEATURED_GENRES.map(({ label, icon }) => (
            <div key={label} className="genre-pill" role="button" tabIndex={0}
                 aria-label={`Browse ${label} movies`}>
              <span className="genre-pill__icon" aria-hidden="true">{icon}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Features Section */}
    <section className="features">
      <div className="container">
        <h2 className="section-title">Why Burki Studio?</h2>
        <div className="features__grid">
          {FEATURES.map((f) => (
            <div key={f.title} className="feature-card">
              <span className="feature-card__icon" aria-hidden="true">{f.icon}</span>
              <h3 className="feature-card__title">{f.title}</h3>
              <p className="feature-card__desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

  </div>
);

export default Home;
