
import { useState } from 'react'
import useRecipe from '../../hooks/useRecipe'
import getIngredients from '../../utils/getIngredients'
import usePlanningStore from '../../../../store/usePlanningStore'
import './RecipeModal.css'

export default function RecipeModal({ meal, onClose }) {
  const [date, setDate] = useState('')
  const { recipeData, loading, error } = useRecipe(meal.idMeal)
  const addPlannedRecipe = usePlanningStore(state => state.addPlannedRecipe)

  function handleSubmit(event) {
    event.preventDefault()
    if (!date || !recipeData) return

    addPlannedRecipe(recipeData, date, getIngredients(recipeData))
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="recipe-modal" role="dialog" aria-modal="true"
        aria-label="Recette" onClick={event => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Fermer">
          ×
        </button>
        <h3>{meal.strMeal}</h3>

        <form onSubmit={handleSubmit}>
          <label htmlFor="meal-date">Date de consommation</label>
          <input id="meal-date" type="date" value={date}
            onChange={event => setDate(event.target.value)} required />

          {error && <p role="alert">{error}</p>}
          <button type="submit" disabled={loading || !recipeData}>
            {loading ? 'Chargement...' : 'Ajouter au planning'}
          </button>
        </form>
      </div>
    </div>
  )
}
