import { Link, useLocation } from 'react-router'
import SearchBar from '../SearchBar/SearchBar.jsx'
import './Header.css'

export default function Header({ search, onSearch }) {
  const location = useLocation()

  return (
    <header className="header">
      <div className="header-content">
        <nav className="header-nav">
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/shopping-list">Liste de Courses</Link></li>
            <li><Link to="/planning">Planning</Link></li>
          </ul>
        </nav>

        <h1>Ri7pes</h1>

        {location.pathname === '/' && (
          <SearchBar search={search} onSearch={onSearch} />
        )}
      </div>
    </header>
  )
}