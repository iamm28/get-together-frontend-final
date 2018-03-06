import React from 'react'
import { connect } from 'react-redux';
import {addUser} from '../actions'

class SignUp extends React.Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    age: undefined,
    gender: '',
    city: '',
    state: '',
    interests: []
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.addUser({ first_name: this.state.first_name, last_name: this.state.last_name, email: this.state.email, password: this.state.password, age: this.state.age, gender: this.state.gender, city: this.state.city, state: this.state.state, interests: this.state.interests})
  };

  handleChangeInterests = (event) => {
    if (event.target.checked) {
      this.setState({
        interests: [...this.state.interests, event.target.value]
      })
    } else {
      const removeIndex = this.state.interests.findIndex(i => i === event.target.value);
      this.setState({
        interests: [...this.state.interests.slice(0, removeIndex), ...this.state.interests.slice(removeIndex + 1)]
      })
    }
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <h3 style={{color: '#ffffff'}}>Sign Up</h3>
        <form onSubmit={this.handleSubmit} className="login100-form">
          <input className="input100" type="text" name="first_name" placeholder="First Name" onChange={this.handleChange} value={this.state.first_name}/>
          <input className="input100" type="text" name="last_name" placeholder="Last Name" onChange={this.handleChange} value={this.state.last_name}/>
          <input className="input100" type="text" name="age" placeholder="Age" onChange={this.handleChange} value={this.state.age}/>
          <select className="input100" name="gender" placeholder="Gender" onChange={this.handleChange} value={this.state.gender}>
            <option name="gender" value="">Select One</option>
            <option name="gender" value="Female">Female</option>
            <option name="gender" value="Male">Male</option>
            <option name="gender" value="Other">Other</option>
            <option name="gender" value="Rather Not Say">Rather Not Say</option>
          </select>
          <input className="input100" type="text" name="city" placeholder="City" onChange={this.handleChange} value={this.state.city}/>
          <input className="input100" type="text" name="state" placeholder="State" onChange={this.handleChange} value={this.state.state}/>
          <p>Check All Interests</p>
          <input type="checkbox" name="interests" onChange={this.handleChangeInterests} value="Travel & Outdoor"/>Travel & Outdoor<br/>
          <input type="checkbox" name="interests" onChange={this.handleChangeInterests} value="Food & Drink"/>Food & Drink<br/>
          <input type="checkbox" name="interests" onChange={this.handleChangeInterests} value="Music"/>Music<br/>
          <input type="checkbox" name="interests" onChange={this.handleChangeInterests} value="Networking"/>Networking<br/>
          <input type="checkbox" name="interests" onChange={this.handleChangeInterests} value="Performing & Visual Arts"/>Performing & Visual Arts<br/>
          <input type="checkbox" name="interests" onChange={this.handleChangeInterests} value="Film, Media & Entertainment"/>Film, Media & Entertainment<br/>
          <input type="checkbox" name="interests" onChange={this.handleChangeInterests} value="Sports & Fitness"/>Sports & Fitness<br/>
          <input type="checkbox" name="interests" onChange={this.handleChangeInterests} value="Health & Wellness"/>Health & Wellness<br/>
          <input className="input100" type="text" name="email" placeholder="Email" onChange={this.handleChange} value={this.state.email}/>
          <input className="input100" type="password" name="password" placeholder="Password" onChange={this.handleChange} value={this.state.password}/>
          <div className="input100-submit">
            <input className="input100 login100-form-submit" type="submit" value="Sign Up" />
          </div>
        </form>
      </div>
    )
  }
}
export default connect(null, {addUser}) (SignUp);
// export default SignUp

// <div className="wrap-input100">
// <span className="focus-input100"></span>
// <span className="symbol-input100">
//   <i className="fa fa-envelope" aria-hidden="true"></i>
// </span>
// </div>

// <div className="wrap-input100">
//   <span className="focus-input100"></span>
//   <span className="symbol-input100">
//     <i className="fa fa-lock" aria-hidden="true"></i>
//   </span>
// </div>

// <input className="input100" type="text" name="gender" placeholder="Gender" onChange={this.handleChange} value={this.state.gender}/>
// <input className="input100" type="text" name="interests" placeholder="Interests" onChange={this.handleChange} value={this.state.interests}/>
