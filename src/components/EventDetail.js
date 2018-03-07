import React from 'react'
import GroupDetail from './GroupDetail'
import { connect } from 'react-redux';
import { fetchGetGroup } from '../actions'

class EventDetail extends React.Component {
  // componentDidMount() {
  //   if (!this.props.eventDetails) {
  //     return null
  //   } else {
  //     return this.props.fetchGetGroup(parseInt(this.props.eventDetails.id),this.props.user_id)
  //   }
  // }

  render() {
    if (!this.props.eventDetails) {
      return null
    } else {
      // debugger //maybe put in next one up
      // const group_info = this.props.fetchGetGroup(parseInt(this.props.eventDetails.id),this.props.user_id)
      console.log(this.props.groupDetails)
      const timeInfo = this.formatDateAndTime(this.props)
      return (
        <div>
          <div className="Event-Detail">
            <div>
              {(this.props.eventDetails.logo !== null) ? <img className="event-logo" src={`${this.props.eventDetails.logo.original.url}`}></img> : null}
            </div>
            <div>
              <h2 dangerouslySetInnerHTML={{ __html: this.props.eventDetails.name.html }} />
              <h3>{timeInfo.dates}</h3>
              <h3>{timeInfo.start_time} - {timeInfo.end_time}</h3>
              <h3>{this.props.eventDetails.venue.address.localized_multi_line_address_display.join(' ')}</h3>
              <h3>{this.props.eventDetails.is_free ? "FREE":"$$"}</h3>
            </div>
          </div>
          <div>
            <div className="details-format" dangerouslySetInnerHTML={{ __html: this.props.eventDetails.description.html }} />
          </div>
          <div>
            {}
          </div>
        </div>
      )
    }
  }

  formatDateAndTime(props) {
    // console.log(props)
    const start_date = new Date(props.eventDetails.start.local).toString().split(' ').slice(0,-3).join(' ')
    const end_date = new Date(props.eventDetails.end.local).toString().split(' ').slice(0,-3).join(' ')
    let start_hours = new Date(props.eventDetails.start.local).getHours()//.toString().split(' ')[4].split('').splice(0,5).join('')
    let start_AMPM
    if (start_hours > 12) {
      start_hours = start_hours -12
      start_AMPM = "PM"
    } else {
      start_AMPM = "AM"
    }
    let end_hours = new Date(props.eventDetails.end.local).getHours()//.toString().split(' ')[4].split('').splice(0,5).join('')
    let end_AMPM
    if (end_hours > 12) {
      end_hours = end_hours -12
      end_AMPM = "PM"
    } else {
      end_AMPM = "AM"
    }
    let start_minutes = new Date(props.eventDetails.start.local).getMinutes()//.toString().split(' ')[4].split('').splice(0,5).join('')
    if (start_minutes < 10) {
      start_minutes = "0" + start_minutes;
    }
    let end_minutes = new Date(props.eventDetails.end.local).getMinutes()//.toString().split(' ')[4].split('').splice(0,5).join('')
    if (end_minutes < 10) {
      end_minutes = "0" + end_minutes;
    }
    const start_time = start_hours+":"+start_minutes+" "+start_AMPM
    const end_time = end_hours+":"+end_minutes+" "+end_AMPM
    let dates = undefined
    if (start_date === end_date) {
      dates = start_date
    } else {
      dates = start_date+ " - " +end_date
    }
    return {dates, start_time, end_time}
  }
}

function mapStateToProps(state) {
  return {
    user_id: state.user_id,
    groupDetails: state.groupDetails
  }
}

export default connect(mapStateToProps,{fetchGetGroup})(EventDetail)

//<img src={`${props.eventDetails.logo.original.url}`} style={{height: "200px"}}></img>
// <p>{props.eventDetails.description.text}</p>
// <div dangerouslySetInnerHTML={{ __html: props.eventDetails.name.html }} />
// <div dangerouslySetInnerHTML={{ __html: props.eventDetails.description.html }} />
