import React from 'react'
import { connect } from 'react-redux'
import { updateEventsAttending, updateEventsDetails, createRsvp, updateRsvps } from '../actions'
import {EB_KEY} from '../secrets'
import EventDetail from './EventDetail'

class EventFilterForm extends React.Component {
  state = {
    city: this.props.user_info.city,
    region: this.props.user_info.state,
    category_ids:[],
    price: undefined,
    date_start: "2018-03-06",
    date_end: "2018-03-07",
    filteredEvents: undefined,
    index: 0
  }

  getEventsUserHasNotSeen(data) {
    if (data.events) {
      return data.events.filter(event => !this.props.rsvps.includes(parseInt(event.id)))
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({
      index: 0
    })
    if (this.state.price && this.state.city && this.state.region && this.state.date_start && this.state.date_end) {
      fetch(`https://www.eventbriteapi.com/v3/events/search/?location.address=${this.state.city}%2C+${this.state.region}&categories=${this.state.category_ids}&price=${this.state.price}&start_date.range_start=${this.state.date_start}T01%3A00%3A00Z&start_date.range_end=${this.state.date_end}T23%3A00%3A00Z&expand=venue&token=${EB_KEY}`)
      .then(res => res.json())
      .then(jsonData => {
        this.setState({
          filteredEvents: this.getEventsUserHasNotSeen(jsonData)})
      })
    } else if(this.state.city && this.state.region && this.state.date_start && this.state.date_end) {
      fetch(`https://www.eventbriteapi.com/v3/events/search/?location.address=${this.state.city}%2C+${this.state.region}&categories=${this.state.category_ids}&start_date.range_start=${this.state.date_start}T01%3A00%3A00Z&start_date.range_end=${this.state.date_end}T23%3A00%3A00Z&expand=venue&token=${EB_KEY}`)
        .then(res => res.json())
        .then(jsonData => {
          this.setState({
            filteredEvents: this.getEventsUserHasNotSeen(jsonData)})
        })
    } else {
      alert("City, state, and date fields must be filled out");
    }
  }

  getCurrentEvent() {
    return this.state.filteredEvents[this.state.index]
  }

  handleRSVP = (event) => {
    if (event.target.value ==="YES") {
      this.handleYes()
    } else if (event.target.value ==="NO"){
      this.handleNo()
    }
  }

  handleYes() {
    this.props.updateEventsAttending({eventbrite_id: this.getCurrentEvent().id})
    this.props.updateEventsDetails(this.getCurrentEvent().id)
    this.props.updateRsvps(this.getCurrentEvent().id)
    this.showNextEvent()
  }

  handleNo() {
    this.props.createRsvp({eventbrite_id: this.getCurrentEvent().id})
    this.showNextEvent()
  }

  showNextEvent() {
    this.setState({
      index: this.state.index + 1
    })
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

  handleChangeStartDate = (event) => {
    this.setState({
      date_start: event.target.value
    })
  }

  handleChangeEndDate = (event) => {
    this.setState({
      date_end: event.target.value
    })
  }

  handleChangePrice = (event) => {
    if (event.target.checked) {
      this.setState({
        price: "free"
      })
    } else {
      this.setState({
        price: undefined
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
    console.log(this.props, this.state)
    return (
      <div className="Event-List">
        <form className="Event-Form">
          <div>
            <h2 className="title">Find Events</h2>
            <input className="event-form-input100" type="text" name="city" placeholder="City" value={`${this.state.city}`} onChange={this.handleChangeCity}/><br/>
            <input className="event-form-input100" type="text" name="region" placeholder="State" value={`${this.state.region}`} onChange={this.handleChangeRegion}/><br/>
            <input className="event-form-input100" type="date" name="date_start" placeholder="Date" value={`${this.state.date_start}`} onChange={this.handleChangeStartDate}/><br/>
            <input className="event-form-input100" type="date" name="date_end" placeholder="Date" value={`${this.state.date_end}`} onChange={this.handleChangeEndDate}/><br/>
          </div>
          <div className="checks">
            <div>
              <p className="slide-label">Travel & Outdoor</p>
              <div className="slide">
                <input id="slide2" type="checkbox" name="category_ids" onChange={this.handleChangeCategories} value="109"/><label htmlFor="slide2"></label>
              </div>
              <p className="slide-label">Food & Drink</p>
              <div className="slide">
                <input id="slide3" type="checkbox" name="category_ids" onChange={this.handleChangeCategories} value="110"/><label htmlFor="slide3"></label>
              </div>
              <p className="slide-label">Music</p>
              <div className="slide">
                <input id="slide4" type="checkbox" name="category_ids" onChange={this.handleChangeCategories} value="103"/><label htmlFor="slide4"></label>
              </div>
              <p className="slide-label">Networking</p>
              <div className="slide">
                <input id="slide9" type="checkbox" name="category_ids" onChange={this.handleChangeCategories} value="101"/><label htmlFor="slide9"></label>
              </div>
              <div>
                <p className="slide-label">Free Events Only</p>
                <div className="slide">
                  <input id="slide1" type="checkbox" name="price" onChange={this.handleChangePrice}/><label htmlFor="slide1"></label>
                </div>
              </div>
            </div>
            <div>
              <p className="slide-label">Performing & Visual Arts</p>
              <div className="slide">
                <input id="slide5" type="checkbox" name="category_ids" onChange={this.handleChangeCategories} value="105"/><label htmlFor="slide5"></label>
              </div>
              <p className="slide-label">Film, Media & Entertainment</p>
              <div className="slide">
                <input id="slide6" type="checkbox" name="category_ids" onChange={this.handleChangeCategories} value="104"/><label htmlFor="slide6"></label>
              </div>
              <p className="slide-label">Sports & Fitness</p>
              <div className="slide">
                <input id="slide7" type="checkbox" name="category_ids" onChange={this.handleChangeCategories} value="108"/><label htmlFor="slide7"></label>
              </div>
              <p className="slide-label">Health & Wellness</p>
              <div className="slide">
                <input id="slide8" type="checkbox" name="category_ids" onChange={this.handleChangeCategories} value="107"/><label htmlFor="slide8"></label>
              </div>
              <div>
                <input className="form-submit-button" type="submit" onClick={this.handleSubmit}/>
              </div>
            </div>
          </div>
        </form>
        {Array.isArray(this.state.filteredEvents) ?
          <div className="Event-Form">
            {(this.state.filteredEvents.length === 0) ? <h2>We could not find any events that match your search. Please try searching something different.</h2> : <EventDetail key={this.state.index} eventDetails={this.getCurrentEvent()}/>}
            {(this.state.filteredEvents.length === this.state.index && this.state.filteredEvents.length > 0) ? <h2>We could not find any more events that match your search. Please try searching something different.</h2> : null}
            {(this.state.filteredEvents.length !== 0 && this.state.filteredEvents.length > this.state.index) ?
            <div>
            <h3>Event RSVP</h3>
              <button value="YES" onClick={this.handleRSVP} className="input100 login100-form-submit">YES</button>
              <button value="NO" onClick={this.handleRSVP} className="input100 login100-form-submit">NO</button>
            </div> : null}
          </div>
          : null}

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user_info: state.user_info,
    rsvps: state.rsvps
  }
}

export default connect(mapStateToProps, { updateEventsAttending, updateEventsDetails, createRsvp, updateRsvps })(EventFilterForm)

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

//typeof this.state.filteredEvents !=='string' &
// <input type="checkbox" name="category_ids" onChange={this.handleChangeCategories} value="109"/>Travel & Outdoor<br/>
// <input type="checkbox" name="category_ids" onChange={this.handleChangeCategories} value="110"/>Food & Drink<br/>
// <input type="checkbox" name="category_ids" onChange={this.handleChangeCategories} value="103"/>Music<br/>
// <input type="checkbox" name="category_ids" onChange={this.handleChangeCategories} value="105"/>Performing & Visual Arts<br/>
// <input type="checkbox" name="category_ids" onChange={this.handleChangeCategories} value="104"/>Film, Media & Entertainment<br/>
// <input type="checkbox" name="category_ids" onChange={this.handleChangeCategories} value="108"/>Sports & Fitness<br/>
// <input type="checkbox" name="category_ids" onChange={this.handleChangeCategories} value="107"/>Health & Wellness<br/>
// <input type="checkbox" name="category_ids" onChange={this.handleChangeCategories} value="101"/>Networking<br/>
