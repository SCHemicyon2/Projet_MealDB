
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/react/daygrid'
import interactionPlugin from '@fullcalendar/react/interaction'
import classicThemePlugin from '@fullcalendar/react/themes/classic'
import frLocale from '@fullcalendar/react/locales/fr'
import usePlanningStore from '../../../../store/usePlanningStore'

import '@fullcalendar/react/skeleton.css'
import '@fullcalendar/react/themes/classic/theme.css'
import '@fullcalendar/react/themes/classic/palette.css'

export default function PlanningCalendar() {
    const plannedRecipes = usePlanningStore(state => state.plannedRecipes)
    const removePlanning = usePlanningStore(state => state.removePlanning)
    const updatePlanningDate = usePlanningStore(state => state.updatePlanningDate)

    const events = plannedRecipes.map(recipe => ({
        id: String(recipe.planningId),
        title: recipe.name,
        start: recipe.date,
        allDay: true
    }))

    function handleEventClick(info) {
        const confirmed = window.confirm(
            `Supprimer "${info.event.title}" du planning ?`
        )
        if (confirmed) removePlanning(Number(info.event.id))
    }

    function handleEventDrop(info) {
        updatePlanningDate(Number(info.event.id), info.event.startStr.slice(0, 10))
    }

    return (
        <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, classicThemePlugin]}
            initialView="dayGridMonth"
            locale={frLocale}
            firstDay={1}
            height="auto"
            events={events}
            editable={true}
            eventDrop={handleEventDrop}
            eventClick={handleEventClick}
            eventColor="#e76f35"
            eventTextColor="#ffffff"
        />
    )
}
