import MealCard from '../MealCard/MealCard'

export default function MealList({ meals, onSelect }) {
  return (
    <div className="meals">
      {meals.map(meal => (
        <MealCard
          key={meal.idMeal}
          meal={meal}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}