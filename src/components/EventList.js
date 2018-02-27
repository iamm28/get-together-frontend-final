import React from 'react'
import {EB_KEY} from '../secrets'
import { connect } from 'react-redux';
import { fetchGetEvents } from '../actions'

import EventCard from './EventCard'

class EventList extends React.Component {
  componentDidMount() {
    this.props.fetchGetEvents()
  }
  //only show the users events and do not show events in the past, or events they said no to(add boolean column)
  render() {
    return (
      <div className="Event-List">
        {this.props.events.map((e,i) => {return <EventCard i={i} key={e.eventbrite_id} eb_id={e.eventbrite_id}/>})}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    events: state.events_attending
  }
}

export default connect(mapStateToProps, {fetchGetEvents})(EventList)
