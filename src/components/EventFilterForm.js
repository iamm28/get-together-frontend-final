import React from 'react'
import { connect } from 'react-redux'
import { updateEventsAttending, updateEventsDetails } from '../actions'
import {EB_KEY} from '../secrets'
import EventDetail from './EventDetail'

class EventFilterForm extends React.Component {
  state = {
    city: undefined,
    region: undefined,
    category_ids:[],
    price: "paid",
    date: undefined,
    filteredEvents: [],
    index: 0
  }

  // getEventsUserHasNotSeen() {
  //   this.state.filteredEvents.select
  // }

  handleYes() {
    this.props.updateEventsAttending({eventbrite_id: this.getCurrentEvent().id})
    this.props.updateEventsDetails(this.getCurrentEvent().id)
    this.showNextEvent()
  }

  handleNo() {
    this.showNextEvent()
  }

  handleRSVP = (event) => {
    if (event.target.value ==="YES") {
      this.handleYes()
    } else {
      this.handleNo()
    }
    //rsvp yes create ug and possibly g and e (find or create) fetch post
    //response eb_id and action to add that to events_attending
  }

  getCurrentEvent() {
    return this.state.filteredEvents[this.state.index]
  }

  showNextEvent() {
    this.setState({
      index: this.state.index + 1
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    //this.props.updateForm(this.state)
    fetch(`https://www.eventbriteapi.com/v3/events/search/?location.address=${this.state.city}%2C+${this.state.region}&categories=${this.state.category_ids}&price=${this.state.price}&start_date.range_start=${this.state.date}T01%3A00%3A00Z&expand=venue&token=${EB_KEY}`)
      .then(res => res.json())
      .then(jsonData=> this.setState({filteredEvents: [...jsonData.events]}))
  }

  handleChangeCity = (event) => {
    this.setState({
      city: event.target.value
    })
  }

  handleChangeRegion= (event) => {
    this.setState({
      region: event.target.value
    })
  }

  handleChangeDate = (event) => {
    this.setState({
      date: event.target.value
    })
  }

  handleChangePrice = (event) => {
    if (event.target.checked) {
      this.setState({
        price: "free"
      })
    } else {
      this.setState({
        price: "paid"
      })
    }
  }

  handleChangeCategories = (event) => {
    if (event.target.checked) {
      this.setState({
        category_ids: [...this.state.category_ids, event.target.value]
      })
    } else {
      const removeIndex = this.state.category_ids.findIndex(cat_id => cat_id === event.target.value);
      this.setState({
        category_ids: [...this.state.category_ids.slice(0, removeIndex), ...this.state.category_ids.slice(removeIndex + 1)]
      })
    }

  }

  render() {
    console.log(this.props,this.state.events_attending)
    return (
      <div>
        <h3>Event Filter Form</h3>
        <form>
          <label>City</label>
          <input type="text" name="city" onChange={this.handleChangeCity}/><br/>
          <label>State</label>
          <input type="text" name="region" onChange={this.handleChangeRegion}/><br/>
          <label>Date</label>
          <input type="date" name="date" onChange={this.handleChangeDate}/><br/>
          <input type="checkbox" name="price" onChange={this.handleChangePrice}/><label>Free Events Only</label><br/>
          <label>Categories</label><br/>
          <input type="checkbox" name="category_ids" onChange={this.handleChangeCategories} value="109"/>Travel & Outdoor<br/>
          <input type="checkbox" name="category_ids" onChange={this.handleChangeCategories} value="110"/>Food & Drink<br/>
          <input type="checkbox" name="category_ids" onChange={this.handleChangeCategories} value="103"/>Music<br/>
          <input type="checkbox" name="category_ids" onChange={this.handleChangeCategories} value="105"/>Performing & Visual Arts<br/>
          <input type="checkbox" name="category_ids" onChange={this.handleChangeCategories} value="104"/>Film, Media & Entertainment<br/>
          <input type="checkbox" name="category_ids" onChange={this.handleChangeCategories} value="108"/>Sports & Fitness<br/>
          <input type="checkbox" name="category_ids" onChange={this.handleChangeCategories} value="107"/>Health & Wellness<br/>
          <input type="checkbox" name="category_ids" onChange={this.handleChangeCategories} value="101"/>Networking<br/>
          <input type="submit" onClick={this.handleSubmit}/>
        </form>
        {<EventDetail key={this.state.index} eventDetails={this.getCurrentEvent()}/>}
        <div>
          <h3>Event RSVP</h3>
          <button value="YES" onClick={this.handleRSVP} style={Yes}>YES</button>
          <button value="NO" onClick={this.handleRSVP} style={No}>NO</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    events_attending: state.events_attending
  }
}

export default connect(mapStateToProps, { updateEventsAttending, updateEventsDetails })(EventFilterForm)

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
