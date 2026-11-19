
import ShoppingListIngredient from '../ShoppingListIngredient/ShoppingListIngredient'

export default function DailyList({ date, ingredients }) {
  const formattedDate = new Date(`${date}T00:00:00`).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  })

  return (
    <section className="shopping-day">
      <h2>{formattedDate}</h2>

      <div className="shopping-items">
        {ingredients.map(item => (
          <ShoppingListIngredient key={item.ingredientId} item={item} />
        ))}
      </div>
    </section>
  )
}
