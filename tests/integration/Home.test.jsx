
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Outlet, Route, Routes } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Home from '../../src/features/Recipes/pages/Home/Home'
import useRecipe from '../../src/features/Recipes/hooks/useRecipe'
import axios from 'axios'

vi.mock('../../src/features/Recipes/hooks/useRecipe', () => ({
  default: vi.fn()
}))

const beef = {
  idMeal: '1',
  strMeal: 'Beef Stew',
  strMealThumb: 'beef.jpg'
}

function renderHome(search = '') {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } }
  })

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <Routes>
          <Route element={<Outlet context={{ search }} />}>
            <Route index element={<Home />} />
            <Route path="recipe/:id" element={<p>Page recette</p>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  )
}

describe('Home : tests intégration', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(useRecipe).mockReturnValue({
      recipeData: beef,
      loading: false,
      error: null
    })
  })

  test('charge les catégories et affiche les recettes', async () => {
    renderHome()

    expect(await screen.findByRole('button', { name: 'Beef' }))
      .toBeInTheDocument()

    expect(await screen.findByText('Beef Stew'))
      .toBeInTheDocument()
  })

  test('change de catégorie et affiche les bonnes recettes', async () => {
    renderHome()

    fireEvent.click(await screen.findByRole('button', { name: 'Chicken' }))

    expect(await screen.findByText('Chicken Soup'))
      .toBeInTheDocument()
  })

  test('affiche les résultats d’une recherche', async () => {
    renderHome('chicken')

    expect(await screen.findByText('Chicken Soup'))
      .toBeInTheDocument()
  })

  test('ouvre la modal depuis une recette', async () => {
    renderHome()

    await screen.findByText('Beef Stew')

    fireEvent.click(screen.getByRole('button', { name: '+' }))

    expect(screen.getByRole('dialog', { name: 'Recette' }))
      .toBeInTheDocument()
  })

  test('ferme la modal au clic sur Fermer', async () => {
    renderHome()

    await screen.findByText('Beef Stew')

    fireEvent.click(screen.getByRole('button', { name: '+' }))
    fireEvent.click(screen.getByRole('button', { name: 'Fermer' }))

    expect(screen.queryByRole('dialog'))
      .not.toBeInTheDocument()
  })

  test('MSW intercepte les appels Axios', async () => {
    const response = await axios.get(
      'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
    )

    expect(response.data.meals[0].strCategory).toBe('Beef')
  })
})
