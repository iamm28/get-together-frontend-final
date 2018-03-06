import React from 'react'
import {EB_KEY} from '../secrets'
import { connect } from 'react-redux';
import { fetchGetEvents } from '../actions'
import EventCard from './EventCard'

//only show the users events and do not show events in the past, or events they said no to(add boolean column)
class EventList extends React.Component {

  render() {
    console.log(this.props)
    return (
      <div>
        <h1 className="title">Your Events</h1>
        <div className="Event-List">
          {this.props.events_attending.map((e,i) => {return <EventCard i={i} key={e} eb_id={e}/>})}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user_id: state.user_id,
    events_attending: state.events_attending,
  }
}

export default connect(mapStateToProps)(EventList)
