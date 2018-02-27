import React from 'react'
import { connect } from 'react-redux'
import { updateForm } from '../actions'
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

  getCurrentEvent() {
    this.state.filteredEvents[this.state.index]
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
    console.log(this.state)
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
        {this.state.filteredEvents.map((e) => {return <EventDetail key={e.id} eventDetails={e}/>})}
      </div>
    )
  }

}

// function mapStateToProps(state) {
//   return {
//     eventFilters: state.eventFilters
//   }
// }
export default EventFilterForm
//export default connect(null, { updateForm })(EventFilterForm)

// value={this.props.eventFilters.city}
// value={this.props.eventFilters.region}
// value={this.props.eventFilters.date}
// value={this.props.eventFilters.price}

// handleChangeLocation = (event) => { //city, state (city,region)
//   this.props.updateForm(event.target)
// }
//
// handleChangeDate = (event) => {
//   this.props.updateForm(event.target)
// }
//
// handleChangeFreeOnly = (event) => {
//   if (event.target.checked) {
//     this.props.updateForm(true)
//   } else {
//     this.props.updateForm(false)
//   }
// }
//
// handleChangeCategories = (event) => {
//   //deal with updating if checked or not
//   if (event.target.checked) {
//     this.props.updateForm(event.target)
//   } //else {
//   //   this.props.updateForm(event.target)
//   // }
// }

// <select>
//   <option value="music">Music</option> id=103
//   <option value="food-and-drink">Food & Drink</option> id=110
//   <option value="classes">Classes</option> ??
//   <option value="arts">Arts</option> id=105, 104
//   <option value="parties">Parties</option> ??
//   <option value="sports-and-fitness">Sports & Wellness</option> id=108, id=107
//   <option value="networking">Networking</option> id=101
// </select>
