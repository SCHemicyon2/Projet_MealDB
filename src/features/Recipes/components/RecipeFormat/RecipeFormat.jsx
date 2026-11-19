export default function RecipeFormat({ recipe }) {
  const ingredients = []

  for (let i = 1; i <= 20; i++) {
    const name = recipe[`strIngredient${i}`]?.trim()
    const measure = recipe[`strMeasure${i}`]?.trim()

    if (name) {
      ingredients.push({ name, measure })
    }
  }

  return (
    <ul className="recipe-ingredients">
      {ingredients.map((ingredient, index) => (
        <li key={index}>
          <span>{ingredient.name}</span>
          <span>{ingredient.measure}</span>
        </li>
      ))}
    </ul>
  )
}