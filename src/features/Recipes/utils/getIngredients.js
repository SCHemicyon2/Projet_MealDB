export default function getIngredients(recipe) {
  const ingredients = []

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`]?.trim()
    const measure = recipe[`strMeasure${i}`]?.trim()

    if (ingredient) {
      ingredients.push({
        name: ingredient,
        measure: measure || ''
      })
    }
  }

  return ingredients
}