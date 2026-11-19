import { http, HttpResponse } from 'msw'

export const categories = [
  {
    idCategory: '1',
    strCategory: 'Beef',
    strCategoryThumb: 'https://www.themealdb.com/images/category/beef.png',
    strCategoryDescription: 'Recettes à base de bœuf.',
  },
  {
    idCategory: '2',
    strCategory: 'Chicken',
    strCategoryThumb: 'https://www.themealdb.com/images/category/chicken.png',
    strCategoryDescription: 'Recettes à base de poulet.',
  },
]

export const meals = [
  {
    idMeal: '1',
    strMeal: 'Beef Stew',
    strMealThumb: 'beef.jpg',
    strCategory: 'Beef',
  },
  {
    idMeal: '2',
    strMeal: 'Chicken Soup',
    strMealThumb: 'chicken.jpg',
    strCategory: 'Chicken',
  },
]

const apiUrl = 'https://www.themealdb.com/api/json/v1/1'

const corsOptions = {
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
}

export const handlers = [
  http.get(`${apiUrl}/list.php`, () => {
    return HttpResponse.json({
      meals: categories.map(category => ({
        strCategory: category.strCategory
      }))
    }, corsOptions)
  }),

  http.get(`${apiUrl}/filter.php`, ({ request }) => {
    const category = new URL(request.url).searchParams.get('c')

    return HttpResponse.json({
      meals: meals.filter(meal => meal.strCategory === category)
    }, corsOptions)
  }),

  http.get(`${apiUrl}/search.php`, ({ request }) => {
    const search = new URL(request.url).searchParams.get('s') || ''

    return HttpResponse.json({
      meals: meals.filter(meal =>
        meal.strMeal.toLowerCase().includes(search.toLowerCase())
      )
    }, corsOptions)
  }),
]