import React from 'react'
import { connect } from 'react-redux';
import { fetchGetEventDetails } from '../actions'
import EventDetail from './EventDetail'

//set up match eb_id to event details id to render each one instead of using index
class EventCard extends React.Component {
  componentDidMount() {
    console.log("EB_ID", this.props.eb_id)
    this.props.fetchGetEventDetails(this.props.eb_id)
  }

  render() {
    //console.log(this.props)
    return (
      <div className="Event-Card">
        <EventDetail key={this.props.eb_id} eventDetails={this.props.eventDetails[this.props.i]} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    eventDetails: state.eventDetails,
    events_attending: state.events_attending
  }
}

export default connect(mapStateToProps, {fetchGetEventDetails})(EventCard)
