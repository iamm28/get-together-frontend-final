import React from 'react'

import EventFilterForm from './EventFilterForm'
import EventRSVP from './EventRSVP'
import EventDetail from './EventDetail'

const EventTinder = (props) => {
  return (
    <div>
      <h1>Event Tinder</h1>
      <EventFilterForm />
      <EventDetail />
      <EventRSVP />

    </div>

  )
}

export default EventTinder
