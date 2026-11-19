
import usePlanningStore from '../../../../store/usePlanningStore'
import DailyList from '../../components/DailyList/DailyList'
import getWeeklyList from '../../utils/getWeeklyList'
import './ShoppingList.css'

export default function ShoppingList() {
  const ingredients = usePlanningStore(state => state.ingredients)
  const plannedRecipes = usePlanningStore(state => state.plannedRecipes)

  const weeklyIngredients = getWeeklyList(ingredients, plannedRecipes)
  const dates = [...new Set(weeklyIngredients.map(item => item.date))]

  return (
    <main className="shopping-list">
      <h1>Ma liste de courses</h1>
      <p className="shopping-subtitle">Ingrédients de la semaine en cours</p>

      {weeklyIngredients.length === 0 && (
        <p className="shopping-empty">Aucun ingrédient prévu cette semaine.</p>
      )}

      {dates.map(date => (
        <DailyList
          key={date}
          date={date}
          ingredients={weeklyIngredients.filter(item => item.date === date)}
        />
      ))}
    </main>
  )
}
