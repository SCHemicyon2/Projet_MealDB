
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { createPlanningSlice } from './planningSlice'
import { createIngredientsSlice } from './ingredientsSlice'

const usePlanningStore = create(
  devtools(
    persist(
      (set) => ({
        ...createPlanningSlice(set),
        ...createIngredientsSlice(set)
      }),
      { name: 'meal-planning' }
    )
  )
)

export default usePlanningStore
