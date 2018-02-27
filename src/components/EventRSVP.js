import React from 'react'

const Yes = {
  padding: '12px',
  margin: '0 6px 6px',
  background: 'green',
  textDecoration: 'none',
  color: 'white',
}
const No = {
  padding: '12px',
  margin: '0 6px 6px',
  background: 'red',
  textDecoration: 'none',
  color: 'white',
}

const EventRSVP = (props) => {
  return (
    <div>
      <h3>Event RSVP</h3>
      <button style={Yes}>YES</button>
      <button style={No}>NO</button>
    </div>

  )
}

export default EventRSVP
