import React from 'react'

import EventCard from './EventCard'

const EventList = (props) => {
  return (
    <div>
      <h2>Event List</h2>
      <EventCard />
      <EventCard />
    </div>
  )
}

export default EventList
