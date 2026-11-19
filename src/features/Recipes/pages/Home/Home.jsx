
import { useState } from 'react'
import { useToggle } from 'usehooks-ts'
import { useOutletContext } from 'react-router'
import CategoryNavBar from '../../components/CategoryNavBar/CategoryNavBar'
import MealList from '../../components/MealList/MealList'
import RecipeModal from '../../components/RecipeModal/RecipeModal'
import useMeals from '../../hooks/useMeals'
import './Home.css'

export default function Home() {
  const { search } = useOutletContext()
  const [category, setCategory] = useState('')
  const [selectedMeal, setSelectedMeal] = useState(null)
  const [isOpen, , setIsOpen] = useToggle(false)
  const { meals, error, loading } = useMeals(category, search)

  function openModal(meal) {
    setSelectedMeal(meal)
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
    setSelectedMeal(null)
  }

  return (
    <main className="home">
      <CategoryNavBar
        selectedCategory={category}
        onSelectCategory={setCategory}
      />

      {loading && <p>Chargement...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && !meals.length && (category || search.trim()) && (
        <p>Aucune recette trouvée.</p>
      )}

      <MealList meals={meals} onSelect={openModal} />

      {isOpen && (
        <RecipeModal meal={selectedMeal} onClose={closeModal} />
      )}
    </main>
  )
}
