import React from 'react'

import UserInfo from './UserInfo'
import UserEditForm from './UserEditForm'

const ProfileContainer = (props) => {
  return (
    <div>
      <h3>Profile Container</h3>
      <UserInfo />
      <UserEditForm />
    </div>
  )
}

export default ProfileContainer
