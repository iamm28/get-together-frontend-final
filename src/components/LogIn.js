import React from 'react'
import { connect } from 'react-redux';
import {addUser} from '../actions'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'

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
    console.log(this.props)
    if (this.props.user_id) {
      return <Redirect exact from="/login" to="/home" />
    } else {
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
}
function mapStateToProps(state) {
  return {
    user_id: state.user_id
  }
}

export default connect(mapStateToProps, {addUser}) (LogIn);
