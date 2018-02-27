import React from 'react'
import {EB_KEY} from '../secrets'
import { connect } from 'react-redux';
import { fetchGetEventDetails } from '../actions'

import EventDetail from './EventDetail'

class EventCard extends React.Component {
  componentDidMount() {
    this.props.fetchGetEventDetails(this.props.eb_id)
  }

  render() {
    //console.log(this.props.eb_id)
    return (
      <div className="Event-Card">
        <EventDetail key={this.props.eb_id} eventDetails={this.props.eventDetails[this.props.i]} />
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    eventDetails: state.eventDetails
  }
}

export default connect(mapStateToProps, {fetchGetEventDetails})(EventCard)
