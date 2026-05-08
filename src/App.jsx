import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext';
import Home from './components/Home';
import SearchPage from './pages/SearchPage';
import MoviePage from './pages/MoviePage';
import './index.css';

/* ─────────────────────────────────────────────────────────
   Navbar – transparent over hero, solid on scroll
───────────────────────────────────────────────────────── */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : 'navbar--transparent'}`}>
      <div className="navbar__inner container">

        {/* Brand / Logo */}
        <NavLink to="/" className="navbar__brand" aria-label="CineVault home">
          <span className="navbar__brand-icon" aria-hidden="true">
            {/* Film strip SVG */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                 width="26" height="26">
              <rect x="2" y="3" width="20" height="18" rx="2" />
              <path d="M7 3v18M17 3v18M2 8h5M17 8h5M2 16h5M17 16h5" />
            </svg>
          </span>
          <span className="navbar__brand-name">Burki Studio</span>
        </NavLink>

        {/* Desktop nav links */}
        <nav className="navbar__links" aria-label="Main navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `navbar__link ${isActive ? 'navbar__link--active' : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/search"
            className={({ isActive }) =>
              `navbar__link ${isActive ? 'navbar__link--active' : ''}`
            }
          >
            Search
          </NavLink>
        </nav>

        {/* Mobile hamburger */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="navbar__mobile-menu" aria-label="Mobile navigation">
          <NavLink to="/"      end onClick={() => setMenuOpen(false)} className="navbar__mobile-link">Home</NavLink>
          <NavLink to="/search"   onClick={() => setMenuOpen(false)} className="navbar__mobile-link">Search</NavLink>
        </nav>
      )}
    </header>
  );
};

/* ─────────────────────────────────────────────────────────
   Footer
───────────────────────────────────────────────────────── */
const Footer = () => (
  <footer className="footer">
    <div className="container footer__inner">
      <span className="footer__brand">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
             width="18" height="18" aria-hidden="true">
          <rect x="2" y="3" width="20" height="18" rx="2" />
          <path d="M7 3v18M17 3v18M2 8h5M17 8h5M2 16h5M17 16h5" />
        </svg>
        Burki Studio
      </span>
      <span className="footer__credit">
        Powered by{' '}
        <a href="https://www.omdbapi.com" target="_blank" rel="noopener noreferrer">
          OMDb API
        </a>
      </span>
    </div>
  </footer>
);

/* ─────────────────────────────────────────────────────────
   App Root
───────────────────────────────────────────────────────── */
function App() {
  return (
    <MovieProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/"               element={<Home />}       />
              <Route path="/search"         element={<SearchPage />} />
              <Route path="/movie/:imdbID"  element={<MoviePage />}  />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </MovieProvider>
  );
}

export default App;
