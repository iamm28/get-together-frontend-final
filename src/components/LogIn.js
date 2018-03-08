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
      return <Redirect exact from="/login" to="/your-events" />
    } else {
      return (
        <div className="login-page">
          <img src={require("../imgs/gettogetherfinal.png")} className="App-logo-bounce center"/>
          {this.state.error ? <h3 className="login100-form-title">Email or Password Incorrect</h3> : null}
          <form onSubmit={this.handleSubmit} className="login100-form center">
            <div className="wrap-input100">
              <input className="input100" type="text" name="email" placeholder="Email" onChange={this.handleChange} value={this.state.email}/>
              <span className="focus-input100"></span>
    					<span className="symbol-input100">
    						<i className="fa fa-envelope" aria-hidden="true"></i>
    					</span>
            </div>
            <div className="wrap-input100">
              <input className="input100" type="password" name="password" placeholder="Password" onChange={this.handleChange} value={this.state.password}/>
              <span className="focus-input100"></span>
    					<span className="symbol-input100">
    						<i className="fa fa-lock" aria-hidden="true"></i>
    					</span>
            </div>
            <div className="input100-submit">
              <input className="filter100 login100-form-submit" type="submit" value="Login" />
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

export default connect(mapStateToProps, {addUser}) (LogIn);
