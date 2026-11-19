
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { categoryQuery, searchQuery } from '../../../query/mealQueries'

export async function getMeals(category, search) {
  const query = search.trim()
  const endpoint = query ? 'search.php' : 'filter.php'
  const params = query ? { s: query } : { c: category }

  const response = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/${endpoint}`,
    { params }
  )

  return response.data.meals ?? []
}

export default function useMeals(category, search) {
  const query = search.trim()
  const options = query ? searchQuery(query) : categoryQuery(category)

  const { data, isLoading, isError } = useQuery({
    ...options,
    queryFn: () => getMeals(category, query)
  })

  const meals = data ?? []
  const loading = isLoading
  const error = isError ? 'Erreur lors du chargement des recettes.' : ''

  return { meals, error, loading }
}
