
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { recipeQuery } from '../../../query/mealQueries'

export async function getRecipe(id) {
  const response = await axios.get(
    'https://www.themealdb.com/api/json/v1/1/lookup.php',
    { params: { i: id } }
  )

  return response.data.meals?.[0] ?? null
}

export default function useRecipe(id) {
  const { data, isLoading, isError } = useQuery({
    ...recipeQuery(id),
    queryFn: () => getRecipe(id)
  })

  const recipeData = data ?? null
  const loading = isLoading
  const error = isError ? 'Impossible de récupérer la recette.' : ''

  return { recipeData, error, loading }
}
