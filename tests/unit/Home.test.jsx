
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { useOutletContext } from 'react-router'
import useMeals from '../../src/features/Recipes/hooks/useMeals'
import Home from '../../src/features/Recipes/pages/Home/Home'

vi.mock('react-router', () => ({
  useOutletContext: vi.fn()
}))

vi.mock('../../src/features/Recipes/hooks/useMeals', () => ({
  default: vi.fn()
}))

vi.mock('../../src/features/Recipes/components/CategoryNavBar/CategoryNavBar', () => ({
  default: ({ onSelectCategory }) => (
    <button onClick={() => onSelectCategory('Beef')}>Beef</button>
  )
}))

vi.mock('../../src/features/Recipes/components/MealList/MealList', () => ({
  default: ({ meals, onSelect }) => (
    <div>
      {meals.map((meal) => (
        <button key={meal.idMeal} onClick={() => onSelect(meal)}>
          {meal.strMeal}
        </button>
      ))}
    </div>
  )
}))

vi.mock('../../src/features/Recipes/components/RecipeModal/RecipeModal', () => ({
  default: ({ meal, onClose }) => (
    <div>
      <p>Modal : {meal.strMeal}</p>
      <button onClick={onClose}>Fermer</button>
    </div>
  )
}))

describe('Home : tests unitaires', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(useOutletContext).mockReturnValue({ search: '' })

    vi.mocked(useMeals).mockReturnValue({
      meals: [],
      error: null,
      loading: false
    })
  })

  test('affiche les recettes récupérées', () => {
    vi.mocked(useMeals).mockReturnValue({
      meals: [{ idMeal: '1', strMeal: 'Pizza' }],
      error: null,
      loading: false
    })

    render(<Home />)

    expect(screen.getByRole('button', { name: 'Pizza' })).toBeInTheDocument()
  })

  test('transmet la recherche au hook useMeals', () => {
    vi.mocked(useOutletContext).mockReturnValue({ search: 'pasta' })

    render(<Home />)

    expect(useMeals).toHaveBeenCalledWith('', 'pasta')
  })

  test('change de catégorie au clic', () => {
    render(<Home />)

    fireEvent.click(screen.getByRole('button', { name: 'Beef' }))

    expect(useMeals).toHaveBeenLastCalledWith('Beef', '')
  })

  test('affiche le chargement', () => {
    vi.mocked(useMeals).mockReturnValue({
      meals: [],
      error: null,
      loading: true
    })

    render(<Home />)

    expect(screen.getByText('Chargement...')).toBeInTheDocument()
  })

  test('affiche une erreur', () => {
    vi.mocked(useMeals).mockReturnValue({
      meals: [],
      error: 'Erreur API',
      loading: false
    })

    render(<Home />)

    expect(screen.getByText('Erreur API')).toBeInTheDocument()
  })

  test('affiche un message si aucune recette n’est trouvée', () => {
    vi.mocked(useOutletContext).mockReturnValue({ search: 'inconnue' })

    render(<Home />)

    expect(screen.getByText('Aucune recette trouvée.')).toBeInTheDocument()
  })

  test('ouvre la modal au clic sur une recette', () => {
  vi.mocked(useMeals).mockReturnValue({
    meals: [{ idMeal: '1', strMeal: 'Pizza' }],
    error: null,
    loading: false
  })

  render(<Home />)

  fireEvent.click(screen.getByRole('button', { name: 'Pizza' }))

  expect(screen.getByText('Modal : Pizza')).toBeInTheDocument()
})

test('ferme la modal au clic sur Fermer', () => {
  vi.mocked(useMeals).mockReturnValue({
    meals: [{ idMeal: '1', strMeal: 'Pizza' }],
    error: null,
    loading: false
  })

  render(<Home />)

  fireEvent.click(screen.getByRole('button', { name: 'Pizza' }))
  fireEvent.click(screen.getByRole('button', { name: 'Fermer' }))

  expect(screen.queryByText('Modal : Pizza')).not.toBeInTheDocument()
})
})
