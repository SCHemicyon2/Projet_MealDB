import { useNavigate } from 'react-router'

export default function MealCard({ meal, onSelect }) {
    const navigate = useNavigate()
  return (
    <article className="meal-card" >
      <img src={meal.strMealThumb} alt={meal.strMeal} onClick={() => navigate(`/recipe/${meal.idMeal}`)}/>

      <div className="meal-content">
        <h3>{meal.strMeal}</h3>

        <button onClick={() => onSelect(meal)}>
          +
        </button>
      </div>
    </article>
  )
}