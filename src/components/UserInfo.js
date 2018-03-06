import React from 'react'
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'

class UserInfo extends React.Component {
  // console.log(props.user.interests.join(', '))
  render() {
    if (!this.props.user_id) {
      return <Redirect exact from="/profile" to="/signup"/>
    } else {
      return (
        <div>
          <div>
            <img src={require("../imgs/profile-image.png")} className="profile-img"/>
            <p className="profile-name">{this.props.user.first_name} {this.props.user.last_name}</p>
          </div>
          <div className="profile-info">
            <p>Email: {this.props.user.email}</p>
            <p>Age: {this.props.user.age}</p>
            <p>Gender: {this.props.user.gender}</p>
            <p>Location: {this.props.user.city}, {this.props.user.state}</p>
            <p>Interests: {this.props.user.interests.join(', ')}</p>
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.user_info,
    user_id: state.user_id
  }
}

export default connect(mapStateToProps) (UserInfo);
