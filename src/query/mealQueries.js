
export const categoryQuery = (category) => ({
  queryKey: ['meals', 'category', category],
  enabled: Boolean(category)
})

export const searchQuery = (search) => ({
  queryKey: ['meals', 'search', search],
  enabled: Boolean(search.trim())
})

export const recipeQuery = (id) => ({
  queryKey: ['meal', 'detail', id],
  enabled: Boolean(id)
})
