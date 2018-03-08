import React from 'react'
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'
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
    if (this.props.user_id) {
      return <Redirect exact from="/signup" to="/your-events"/>
    } else {
    return (
      <div className="signup-page">
        <form onSubmit={this.handleSubmit} className="signup">
          <div className="signup1">
            <h3 style={{color: '#ffffff'}}>Sign Up</h3>
            <input className="input100 wrap-input100" type="text" name="first_name" placeholder="First Name" onChange={this.handleChange} value={this.state.first_name}/>
            <input className="input100 wrap-input100" type="text" name="last_name" placeholder="Last Name" onChange={this.handleChange} value={this.state.last_name}/>
            <input className="input100 wrap-input100" type="text" name="city" placeholder="City" onChange={this.handleChange} value={this.state.city}/>
            <input className="input100 wrap-input100" type="text" name="state" placeholder="State" onChange={this.handleChange} value={this.state.state}/>
            <input className="input100 wrap-input100" type="text" name="email" placeholder="Email" onChange={this.handleChange} value={this.state.email}/>
            <input className="input100 wrap-input100" type="password" name="password" placeholder="Password" onChange={this.handleChange} value={this.state.password}/>
            <input className="input100 wrap-input100" type="text" name="age" placeholder="Age" onChange={this.handleChange} value={this.state.age}/>
            <select className="input100 wrap-input100" name="gender" placeholder="Gender" onChange={this.handleChange} value={this.state.gender}>
              <option name="gender" value="">Gender</option>
              <option name="gender" value="Female">Female</option>
              <option name="gender" value="Male">Male</option>
              <option name="gender" value="Other">Other</option>
              <option name="gender" value="Rather Not Say">Rather Not Say</option>
            </select>
          </div>
          <div className="signup2">
            <p>Select Your Interests</p>
              <div className="checks">
                <div>
                  <p className="slide-label">Travel & Outdoor</p>
                  <div className="slide">
                    <input id="slide2" type="checkbox" name="interests" onChange={this.handleChangeInterests} value="Travel & Outdoor"/><label htmlFor="slide2"></label>
                  </div>
                </div>
                <div>
                  <p className="slide-label">Food & Drink</p>
                  <div className="slide">
                    <input id="slide3" type="checkbox" name="interests" onChange={this.handleChangeInterests} value="Food & Drink"/><label htmlFor="slide3"></label>
                  </div>
                </div>
                <div>
                  <p className="slide-label">Music</p>
                  <div className="slide">
                    <input id="slide4" type="checkbox" name="interests" onChange={this.handleChangeInterests} value="Music"/><label htmlFor="slide4"></label>
                  </div>
                </div>
                <div>
                  <p className="slide-label">Networking</p>
                  <div className="slide">
                    <input id="slide5" type="checkbox" name="interests" onChange={this.handleChangeInterests} value="Networking"/><label htmlFor="slide5"></label>
                  </div>
                </div>
                <div>
                  <p className="slide-label">Performing & Visual Arts</p>
                  <div className="slide">
                    <input id="slide6" type="checkbox" name="interests" onChange={this.handleChangeInterests} value="Performing & Visual Arts"/><label htmlFor="slide6"></label>
                  </div>
                </div>
                <div>
                  <p className="slide-label">Film, Media & Entertainment</p>
                  <div className="slide">
                    <input id="slide7" type="checkbox" name="interests" onChange={this.handleChangeInterests} value="Film, Media & Entertainment"/><label htmlFor="slide7"></label>
                  </div>
                </div>
                <div>
                  <p className="slide-label">Sports & Fitness</p>
                  <div className="slide">
                    <input id="slide8" type="checkbox" name="interests" onChange={this.handleChangeInterests} value="Sports & Fitness"/><label htmlFor="slide8"></label>
                  </div>
                </div>
                <div>
                  <p className="slide-label">Health & Wellness</p>
                  <div className="slide">
                    <input id="slide9" type="checkbox" name="interests" onChange={this.handleChangeInterests} value="Health & Wellness"/><label htmlFor="slide9"></label>
                  </div>
                </div>
              </div>
              <div className="signup-submit">
                <input className="login100 login100-form-submit" type="submit" value="Sign Up" />
              </div>
            </div>
        </form>
      </div>
    )
  }
}
}

function mapStateToProps(state) {
  return {
    user_id: state.user_id
  }
}
export default connect(mapStateToProps, {addUser}) (SignUp);
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

// <input type="checkbox" name="interests" onChange={this.handleChangeInterests} value="Travel & Outdoor"/>Travel & Outdoor<br/>
// <input type="checkbox" name="interests" onChange={this.handleChangeInterests} value="Food & Drink"/>Food & Drink<br/>
// <input type="checkbox" name="interests" onChange={this.handleChangeInterests} value="Music"/>Music<br/>
// <input type="checkbox" name="interests" onChange={this.handleChangeInterests} value="Networking"/>Networking<br/>
// <input type="checkbox" name="interests" onChange={this.handleChangeInterests} value="Performing & Visual Arts"/>Performing & Visual Arts<br/>
// <input type="checkbox" name="interests" onChange={this.handleChangeInterests} value="Film, Media & Entertainment"/>Film, Media & Entertainment<br/>
// <input type="checkbox" name="interests" onChange={this.handleChangeInterests} value="Sports & Fitness"/>Sports & Fitness<br/>
// <input type="checkbox" name="interests" onChange={this.handleChangeInterests} value="Health & Wellness"/>Health & Wellness<br/>
