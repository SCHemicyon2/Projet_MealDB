import RecipeFormat from '../RecipeFormat/RecipeFormat'
import { Link } from 'react-router'
import './RecipeCard.css'

export default function RecipeCard({ recipe }) {
    return (
        <article className="recipe-card">
            <Link to="/" className="previous-link">
                <span aria-hidden="true">‹</span>
                <span className="previous-link-text">Retour</span>
            </Link>

            <div className="recipe-card-header">
                <h1>{recipe.strMeal}</h1>

                <div className="recipe-card-details">
                    <p>{recipe.strCategory}</p>
                    <p>|</p>
                    <p>{recipe.strArea}</p>
                </div>

                <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            </div>

            <section className="recipe-card-ingredients">
                <h2>Ingrédients</h2>
                <RecipeFormat recipe={recipe} />
            </section>

            <section className="recipe-card-instructions">
                <h2>Préparation</h2>
                <p>{recipe.strInstructions}</p>
            </section>
        </article>
    )
}