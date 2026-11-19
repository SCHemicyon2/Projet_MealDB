import './SearchBar.css'

export default function SearchBar({ search, onSearch }) {
  return (
    <input
      type="search"
      placeholder="Trouver des recettes..."
      className="search-bar"
      value={search}
      onChange={event => onSearch(event.target.value)}
    />
  )
}