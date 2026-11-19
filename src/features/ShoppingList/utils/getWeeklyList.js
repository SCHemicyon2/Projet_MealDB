
export default function getWeeklyList(ingredients, plannedRecipes) {
  const today = new Date()
  const monday = new Date(today)
  monday.setDate(today.getDate() - (today.getDay() + 6) % 7)
  monday.setHours(0, 0, 0, 0)

  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 7)

  return ingredients
    .map(ingredient => {
      const planning = plannedRecipes.find(
        recipe => recipe.planningId === ingredient.planningId
      )

      if (!planning) return null

      return {
        ...ingredient,
        date: ingredient.date ?? planning.date,
        recipeName: planning.name
      }
    })
    .filter(ingredient => {
      if (!ingredient) return false
      const date = new Date(`${ingredient.date}T00:00:00`)
      return date >= monday && date < sunday
    })
    .sort((a, b) => a.date.localeCompare(b.date))
}
