
import { useState } from 'react'
import usePlanningStore from '../../../../store/usePlanningStore'
import EditIngredient from '../EditIngredient/EditIngredient'

export default function ShoppingListIngredient({ item }) {
  const [editing, setEditing] = useState(false)
  const removeIngredient = usePlanningStore(state => state.removeIngredient)

  return (
    <div className="shopping-item">
      <div className="shopping-item-info">
        <strong>{item.name}</strong>
        <span>{item.recipeName}</span>
      </div>

      {editing ? (
        <EditIngredient
          item={item}
          onClose={() => setEditing(false)}
        />
      ) : (
        <div className="shopping-actions">
          <span className="shopping-measure">{item.measure}</span>
          <button type="button" onClick={() => setEditing(true)}
            aria-label={`Modifier ${item.name}`}>✎</button>
          <button type="button" onClick={() => removeIngredient(item.ingredientId)}
            aria-label={`Supprimer ${item.name}`}>×</button>
        </div>
      )}
    </div>
  )
}
