import React, { Component } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'

import LogIn from './LogIn'
import SignUp from './SignUp'
import ProfileContainer from './ProfileContainer'
import HomeContainer from './HomeContainer'
import EventTinder from './EventTinder'

class MainContainer extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/login' component={ LogIn }/>
        <Route exact path='/signup' component={ SignUp }/>
        <Route exact path='/home' component={ HomeContainer }/>
        <Route exact path='/profile' component={ ProfileContainer }/>
        <Route exact path='/find-events' component={ EventTinder }/>
        <Redirect exact from="/" to="/login" />
      </Switch>
    )
  }
}

export default MainContainer

// add a route to display error for routes with no page
// <Route path="/404" render={ return 404 Page not found} />
// <Redirect to="/404" />
