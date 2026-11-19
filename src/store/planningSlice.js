
export const createPlanningSlice = (set) => ({
  plannedRecipes: [],
  planningIdCounter: 1,

  addPlanning: (recipe) => {
    let planningId

    set((state) => {
      planningId = state.planningIdCounter

      return {
        plannedRecipes: [
          ...state.plannedRecipes,
          { ...recipe, planningId }
        ],
        planningIdCounter: state.planningIdCounter + 1
      }
    })

    return planningId
  },

  addPlannedRecipe: (recipe, date, items) => set((state) => {
    const planningId = state.planningIdCounter

    return {
      plannedRecipes: [
        ...state.plannedRecipes,
        { mealId: recipe.idMeal, name: recipe.strMeal, date, planningId }
      ],
      planningIdCounter: planningId + 1,
      ingredients: [
        ...state.ingredients,
        ...items.map((item, index) => ({
          ...item,
          ingredientId: state.ingredientIdCounter + index,
          planningId
        }))
      ],
      ingredientIdCounter: state.ingredientIdCounter + items.length
    }
  }),

  updatePlanningDate: (planningId, date) => set((state) => ({
    plannedRecipes: state.plannedRecipes.map((recipe) =>
      recipe.planningId === planningId ? { ...recipe, date } : recipe
    )
  })),

  removePlanning: (planningId) => set((state) => ({
    plannedRecipes: state.plannedRecipes.filter(
      recipe => recipe.planningId !== planningId
    ),
    ingredients: state.ingredients.filter(
      ingredient => ingredient.planningId !== planningId
    )
  }))
})
