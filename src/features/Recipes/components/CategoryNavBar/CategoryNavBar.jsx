
import { useEffect, useState } from 'react'
import axios from 'axios'
import './CategoryNavBar.css'

export default function CategoryNavBar({ selectedCategory, onSelectCategory }) {
  const [categories, setCategories] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function getCategories() {
      try {
        const response = await axios.get(
          'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
          { signal: controller.signal }
        )

        const categories = response.data.meals.map(meal => meal.strCategory)
        setCategories(categories)

        if (categories.length > 0) {
          onSelectCategory(current => current || categories[0])
        }
      } catch (error) {
        if (!axios.isCancel(error)) {
          setError('Erreur lors du chargement des catégories.')
        }
      }
    }

    getCategories()
    return () => controller.abort()
  }, [onSelectCategory])

  return (
    <nav className="category-nav-bar">
      {error && <p>{error}</p>}

      <ul>
        {categories.map(category => (
          <li key={category}>
            <button
              className={selectedCategory === category ? 'active' : ''}
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
