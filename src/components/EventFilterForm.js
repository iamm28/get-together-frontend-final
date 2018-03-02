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

  getEventsUserHasNotSeen() {
    //debugger
    const moreFiltered = this.state.filteredEvents.filter(event => {return !this.props.events_attentding.includes(parseInt(event.id))})
    //console.log(moreFiltered)
    this.setState({
      filteredEvents: moreFiltered
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch(`https://www.eventbriteapi.com/v3/events/search/?location.address=${this.state.city}%2C+${this.state.region}&categories=${this.state.category_ids}&price=${this.state.price}&start_date.range_start=${this.state.date}T01%3A00%3A00Z&expand=venue&token=${EB_KEY}`)
      .then(res => res.json())
      .then(jsonData => {
        this.setState({filteredEvents: [...jsonData.events]})
        //this.getEventsUserHasNotSeen()
      })
  }

  getCurrentEvent() {
    return this.state.filteredEvents[this.state.index]
  }

  handleRSVP = (event) => {
    if (event.target.value ==="YES") {
      this.handleYes()
    } else {
      this.handleNo()
    }
  }

  handleYes() {
    this.props.updateEventsAttending({eventbrite_id: this.getCurrentEvent().id})
    this.props.updateEventsDetails(this.getCurrentEvent().id)
    this.showNextEvent()
  }

  handleNo() {
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
    //console.log(this.props,this.state.events_attending)
    return (
      <div className="event-tinder">
        <form>
          <div id="write-in">
            <h2>Find Events</h2>
            <input className="input100" type="text" name="city" placeholder="City" onChange={this.handleChangeCity}/><br/>
            <input className="input100" type="text" name="region" placeholder="State" onChange={this.handleChangeRegion}/><br/>
            <input className="input100" type="date" name="date" placeholder="Date" onChange={this.handleChangeDate}/><br/>
          </div>
          <section id="free-events-only">
            <p>Free Events Only</p>
            <div className="slide">
              <input id="slide1" type="checkbox" name="price" onChange={this.handleChangePrice}/><label htmlFor="slide1"></label>
            </div>
          </section>
          <h3 className="categories">Categories</h3>
          <section id="categories">
            <p>Travel & Outdoor</p>
            <div className="slide">
              <input id="slide2" type="checkbox" name="category_ids" onChange={this.handleChangeCategories} value="109"/><label htmlFor="slide2"></label>
            </div>
            <p>Food & Drink</p>
            <div className="slide">
              <input id="slide3" type="checkbox" name="category_ids" onChange={this.handleChangeCategories} value="110"/><label htmlFor="slide3"></label>
            </div>
            <p>Music</p>
            <div className="slide">
              <input id="slide4" type="checkbox" name="category_ids" onChange={this.handleChangeCategories} value="103"/><label htmlFor="slide4"></label>
            </div>
            <p>Performing & Visual Arts</p>
            <div className="slide">
              <input id="slide5" type="checkbox" name="category_ids" onChange={this.handleChangeCategories} value="105"/><label htmlFor="slide5"></label>
            </div>
            <p>Film, Media & Entertainment</p>
            <div className="slide">
              <input id="slide6" type="checkbox" name="category_ids" onChange={this.handleChangeCategories} value="104"/><label htmlFor="slide6"></label>
            </div>
            <p>Sports & Fitness</p>
            <div className="slide">
              <input id="slide7" type="checkbox" name="category_ids" onChange={this.handleChangeCategories} value="108"/><label htmlFor="slide7"></label>
            </div>
            <p>Health & Wellness</p>
            <div className="slide">
              <input id="slide8" type="checkbox" name="category_ids" onChange={this.handleChangeCategories} value="107"/><label htmlFor="slide8"></label>
            </div>
            <p>Networking</p>
            <div className="slide">
              <input id="slide9" type="checkbox" name="category_ids" onChange={this.handleChangeCategories} value="101"/><label htmlFor="slide9"></label>
            </div>
            <div className="input100-submit">
              <input className="input100 login100-form-submit" type="submit" onClick={this.handleSubmit}/>
            </div>
          </section>
        </form>
        {<EventDetail key={this.state.index} eventDetails={this.getCurrentEvent()}/>}
        {this.state.filteredEvents.length ?
          <div>
            <h3>Event RSVP</h3>
            <button value="YES" onClick={this.handleRSVP} style={Yes}>YES</button>
            <button value="NO" onClick={this.handleRSVP} style={No}>NO</button>
          </div>
        : null}
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

// <input type="checkbox" name="category_ids" onChange={this.handleChangeCategories} value="109"/>Travel & Outdoor<br/>
// <input type="checkbox" name="category_ids" onChange={this.handleChangeCategories} value="110"/>Food & Drink<br/>
// <input type="checkbox" name="category_ids" onChange={this.handleChangeCategories} value="103"/>Music<br/>
// <input type="checkbox" name="category_ids" onChange={this.handleChangeCategories} value="105"/>Performing & Visual Arts<br/>
// <input type="checkbox" name="category_ids" onChange={this.handleChangeCategories} value="104"/>Film, Media & Entertainment<br/>
// <input type="checkbox" name="category_ids" onChange={this.handleChangeCategories} value="108"/>Sports & Fitness<br/>
// <input type="checkbox" name="category_ids" onChange={this.handleChangeCategories} value="107"/>Health & Wellness<br/>
// <input type="checkbox" name="category_ids" onChange={this.handleChangeCategories} value="101"/>Networking<br/>
