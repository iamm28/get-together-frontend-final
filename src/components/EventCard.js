import React from 'react'
import { connect } from 'react-redux';
import { fetchGetEventDetails, fetchGetGroup } from '../actions'
import EventDetail from './EventDetail'

//set up match eb_id to event details id to render each one instead of using index
class EventCard extends React.Component {
  componentDidMount() {
    // console.log("EB_ID", this.props)
    if (this.props.eventDetails.length === 0) {
      this.props.fetchGetEventDetails(this.props.eb_id)
      this.props.fetchGetGroup(this.props.eb_id,this.props.user_id)
    }
  }

  render() {
    console.log(this.props.eventDetails.length)
    const cardDetails = this.props.eventDetails.map(details => {return <EventDetail key={this.props.eb_id} eventDetails={details}/>})
    const members = this.props.groupDetails.map(member =>
      {return (
        <div className="member">
          <img src={require("../imgs/profile-image.png")} className="small-profile-img"/><br/>
          <text>{member.first_name} - {member.age}</text><br/>
          <text>{member.city}, {member.state}</text>
        </div>
      )}
    )

    return (
      <div className="Event-Card">
        <div className="member-container">
          <div className="title">YOUR GET-TOGETHER</div>
          <div className="member-list">
            {members.length < 2 ? <div className="title">Waiting for more attendees</div> : members}
          </div>
        </div>
        {cardDetails}
      </div>
    )
  }
}

function mapStateToProps(state,ownProps) {
  let cardGroup = []
  if (state.groupDetails[ownProps.eb_id]) {
    cardGroup = state.groupDetails[ownProps.eb_id]
  }
  return {
    user_id: state.user_id,
    eventDetails: state.eventDetails.filter(eventDetails => {return eventDetails.id==ownProps.eb_id}),
    events_attending: state.events_attending,
    groupDetails: cardGroup
  }
}

export default connect(mapStateToProps, {fetchGetEventDetails, fetchGetGroup})(EventCard)

// this.props.eventDetails.length < 1 ? <div>Loading</div> : <EventDetail key={this.props.eb_id} eventDetails={this.props.eventDetails[this.props.i]} />
