import React from 'react'
import { connect } from 'react-redux';

const UserInfo = (props) => {
  //console.log(props)
  return (
    <div>
      <p className="profile-name">{props.user.first_name} {props.user.last_name}</p>
      <p>Email: {props.user.email}</p>
      <p>Age: {props.user.age}</p>
      <p>Gender: {props.user.gender}</p>
      <p>Location: {props.user.location}</p>
      <p>Interests: {props.user.interests}</p>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    user: state.user_info
  }
}

export default connect(mapStateToProps) (UserInfo);
