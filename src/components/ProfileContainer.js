import React from 'react'

import UserInfo from './UserInfo'
import UserEditForm from './UserEditForm'

const ProfileContainer = (props) => {
  return (
    <div>
      <UserInfo />
      <UserEditForm />
    </div>
  )
}

export default ProfileContainer
