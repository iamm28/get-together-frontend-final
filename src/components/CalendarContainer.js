import React from 'react'
import EventDetail from './EventDetail'
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

let today = new Date();
let mm = today.getMonth()+1;
let yyyy = today.getFullYear();

class CalendarContainer extends React.Component {

  state = {
    year: yyyy,
    month: mm
  }

  getMonth() { //gets month in word form
    return monthNames[this.state.month-1]
  }

  getDaysInMonth () { //gets number of days in a month
    return new Date(this.state.year, this.state.month, 0).getDate();
  }

  getDayOfWeek () { //gets the day of the week the month starts on in number now but could make it in words too
    if(this.state.month < 10) {
      return new Date(this.state.year + "-" + this.state.month + "-01").getDay()
    } else {
      return new Date(this.state.year + "-" + this.state.month + "-01").getDay() + 1
    }
  }

  nextMonth = () => {
    if (this.state.month === 12) {
      this.setState({
        month: 1,
        year: this.state.year + 1
      })
    } else {
      this.setState({
        month: this.state.month + 1
      })
    }
  }

  prevMonth = () => {
    if (this.state.month === 1) {
      this.setState({
        month: 12,
        year: this.state.year - 1
      })
    } else {
      this.setState({
        month: this.state.month - 1
      })
    }
  }

  displayFillers() {
    let fillers = []
    for (let i = 0; i < this.getDayOfWeek(); i++) {
      fillers.push(
        <div className="day" key={i+1}>
        </div>
      );
    }
    return fillers
  }


  displayDays() {
    let days = []
    let passMonth = this.state.month
    let passYear = this.state.year
    for (let i = 0; i < this.getDaysInMonth(); i++) {

      function getEventDay(event) {
        return new Date(event.start.local).getDate()
      }

      function getEventMonth(event) {
        return new Date(event.start.local).getMonth()+1
      }

      function getEventYear(event) {
        return new Date(event.start.local).getYear()-100+2000
      }

      function filterEvent(event,i) {
        if ((passMonth === getEventMonth(event)) && ((i+1)===getEventDay(event)) && (passYear === getEventYear(event))) {
          return true
        } else {
          return false
        }
      }

      let todaysEvents = this.props.eventDetails.filter( event => {
        return filterEvent(event,i)
      })
      days.push(
        <div className="day" key={i+1}>
          <h3 className="day-label">{i+1}</h3>
          {todaysEvents.map(event => {return (
            <div>
              {event.name.text}
              {this.formatDateAndTime(event.start.local).start_time} - {this.formatDateAndTime(event.end.local).end_time}
            </div>

          )})}
        </div>
      );
    }
    return days
  }


  render() {
    console.log(this.props)
    if (!this.props.user_id) {
      return <Redirect exact from="/calendar" to="/login"/>
    } else {
      return(
        <div>
          <h2 className="title"> {this.getMonth()} - {this.state.year}</h2>
          <button className="center" onClick={this.prevMonth}>⇦</button>
          <button className="center" onClick={this.nextMonth}>⇨</button>
          <div className="day-of-week">
            <div>Sunday</div>
            <div>Monday</div>
            <div>Tuesday</div>
            <div>Wednesday</div>
            <div>Thursday</div>
            <div>Friday</div>
            <div>Saturday</div>
          </div>
          <div className="week">
            {this.displayFillers()}
            {this.displayDays()}
          </div>
        </div>
      )
    }
  }

  formatDateAndTime(datetime) {
    // console.log(props)
    const start_date = new Date(datetime).toString().split(' ').slice(0,-3).join(' ')
    const end_date = new Date(datetime).toString().split(' ').slice(0,-3).join(' ')
    let start_hours = new Date(datetime).getHours()//.toString().split(' ')[4].split('').splice(0,5).join('')
    let start_AMPM
    if (start_hours > 12) {
      start_hours = start_hours -12
      start_AMPM = "PM"
    } else {
      start_AMPM = "AM"
    }
    let end_hours = new Date(datetime).getHours()//.toString().split(' ')[4].split('').splice(0,5).join('')
    let end_AMPM
    if (end_hours > 12) {
      end_hours = end_hours -12
      end_AMPM = "PM"
    } else {
      end_AMPM = "AM"
    }
    let start_minutes = new Date(datetime).getMinutes()//.toString().split(' ')[4].split('').splice(0,5).join('')
    if (start_minutes < 10) {
      start_minutes = "0" + start_minutes;
    }
    let end_minutes = new Date(datetime).getMinutes()//.toString().split(' ')[4].split('').splice(0,5).join('')
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
    eventDetails: state.eventDetails
  }
}
export default connect(mapStateToProps)(CalendarContainer)
