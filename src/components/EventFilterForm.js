import React from 'react'
import { connect } from 'react-redux'
import { updateForm } from '../actions'

class EventFilterForm extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
  }
  //add if it is free
  
  handleChangeLocation = (event) => {
    this.props.updateForm(event.target)
  }

  handleChangeDate = (event) => {
    this.props.updateForm(event.target)
  }

  handleChangeCategories = (event) => {
    if (event.target.checked) {
      this.props.updateForm(event.target)
    } else {
      this.props.updateForm(event.target)
    }
  }

  // handleSubmit = () => {
  //
  // }

  render() {
    return (
      <div>
        <h3>Event Filter Form</h3>
        <form>
          <label>Location</label>
          <input type="text" name="location" value={this.props.eventFilters.location} onChange={this.handleChangeLocation}/>
          <label>Date</label>
          <input type="date" name="date" value={this.props.eventFilters.date} onChange={this.handleChangeDate}/>
          <label>Category</label>
          <input type="checkbox" name="categories" value="music"/>Music
          <input type="checkbox" name="categories" value="food-and-drink"/>Food & Drink
          <input type="checkbox" name="categories" value="classes"/>Classes
          <input type="checkbox" name="categories" value="arts"/>Arts
          <input type="checkbox" name="categories" value="parties"/>Parties
          <input type="checkbox" name="categories" value="sports-and-fitness"/>Sports & Wellness
          <input type="checkbox" name="categories" value="networking"/>Networking
          <input type="submit" />
        </form>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    eventFilters: state.eventFilters
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     updateForm: (eventFilters) => {
//       dispatch(updateForm(eventFilters))
//     }
//   }
// }

export default connect(mapStateToProps, { updateForm })(EventFilterForm)

// <select>
//   <option value="music">Music</option>
//   <option value="food-and-drink">Food & Drink</option>
//   <option value="classes">Classes</option>
//   <option value="arts">Arts</option>
//   <option value="parties">Parties</option>
//   <option value="sports-and-fitness">Sports & Wellness</option>
//   <option value="networking">Networking</option>
// </select>
