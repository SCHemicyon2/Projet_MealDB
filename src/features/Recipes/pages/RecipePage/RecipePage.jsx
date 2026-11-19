import { useParams } from 'react-router'
import useRecipe from '../../hooks/useRecipe'
import RecipeCard from '../../components/RecipeCard/RecipeCard'
import './RecipePage.css'

export default function RecipePage() {
  const { id } = useParams()
  const { recipeData, error, loading } = useRecipe(id)

  if (loading) return <p>Chargement de la recette...</p>
  if (error) return <p>{error}</p>
  if (!recipeData) return <p>Recette introuvable.</p>

  return (
    <main className="recipe-page">
      <RecipeCard recipe={recipeData} />
    </main>
  )
}