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

//first test with event display
//const store = createStore(eventsReducer)
//const initialState= {eventbrite_id: null, events_going:[include some id numbers]}
// const eventsReducer = function (state = intialState, action) {
//   switch (action.type) {
//     case 'SHOW_EVENT':
//       return {...state, eventbrite_id: action.eventbrite_id};
//     default:
//       return state;
//   }
// }
//pass stuff then click event calls store.dispatch etc 
