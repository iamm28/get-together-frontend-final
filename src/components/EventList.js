import React from 'react'
import {EB_KEY} from '../secrets'
import { connect } from 'react-redux';
import { fetchGetEvents } from '../actions'
import EventCard from './EventCard'
import {Redirect} from 'react-router-dom'

//only show the users events and do not show events in the past, or events they said no to(add boolean column)
class EventList extends React.Component {

  render() {
    console.log(this.props)
    if (!this.props.user_id) {
      return <Redirect exact from="/your-events" to="/login"/>
    } else {
    return (
      <div>
        <h1 className="title">YOUR EVENTS</h1>
        <div className="Event-List">
          {this.props.events_attending.map((e,i) => {return <EventCard i={i} key={i} eb_id={e}/>})}
        </div>
      </div>
    )}
  }
}

function mapStateToProps(state) {
  return {
    user_id: state.user_id,
    events_attending: state.events_attending,
  }
}

export default connect(mapStateToProps)(EventList)
