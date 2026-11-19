
import { useState } from 'react'
import usePlanningStore from '../../../../store/usePlanningStore'

export default function EditIngredient({ item, onClose }) {
  const [measure, setMeasure] = useState(item.measure)
  const [date, setDate] = useState(item.date)
  const updateIngredient = usePlanningStore(state => state.updateIngredient)

  function handleSave(event) {
    event.preventDefault()
    if (!date) return

    const changes = { measure }
    if (date !== item.date) changes.date = date

    updateIngredient(item.ingredientId, changes)
    onClose()
  }

  return (
    <form className="shopping-edit" onSubmit={handleSave}>
      <input
        aria-label="Quantité et unité"
        value={measure}
        onChange={event => setMeasure(event.target.value)}
      />
      <input
        aria-label="Date de consommation"
        type="date"
        value={date}
        onChange={event => setDate(event.target.value)}
        required
      />
      <button type="submit">Enregistrer</button>
      <button type="button" onClick={onClose}>Annuler</button>
    </form>
  )
}
