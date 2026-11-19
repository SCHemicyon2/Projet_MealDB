
export const createIngredientsSlice = (set) => ({
    ingredients: [],
    ingredientIdCounter: 1,

    addIngredients: (items, planningId) => set((state) => ({
        ingredients: [
            ...state.ingredients,
            ...items.map((item, index) => ({
                ...item,
                ingredientId: state.ingredientIdCounter + index,
                planningId
            }))
        ],
        ingredientIdCounter: state.ingredientIdCounter + items.length
    })),

    updateIngredient: (ingredientId, changes) => set((state) => ({
        ingredients: state.ingredients.map((item) =>
            item.ingredientId === ingredientId
                ? { ...item, ...changes }
                : item
        )
    })),

    removeIngredient: (ingredientId) => set((state) => ({
        ingredients: state.ingredients.filter((item) =>
            item.ingredientId !== ingredientId
        )
    }))
})
