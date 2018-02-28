import React from 'react'
import { connect } from 'react-redux';
import {addUser} from '../actions'

class LogIn extends React.Component {
  state = {
    email: '',
    password: '',
    error: false
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.addUser({ email: this.state.email, password: this.state.password})
  };

  render() {
    //console.log(this.state,this.props)
    return (
      <div>
        <h3>Log In</h3>
        {this.state.error ? <h3>Email or Password Incorrect</h3> : null}
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" placeholder="email" onChange={this.handleChange} value={this.state.email}/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="Password" onChange={this.handleChange} value={this.state.password}/>
          </div>
          <input type="submit" value="Login" />
        </form>
      </div>
    )
  }
}

export default connect(null, {addUser}) (LogIn);
