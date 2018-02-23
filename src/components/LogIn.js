import React from 'react'

const LogIn = (props) => {
  return (
    <div>
      <form>
        <div>
          <h3>Log In</h3>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" placeholder="Username" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="Password" />
        </div>
        <input type="submit" value="Login" />
      </form>
    </div>
  )
}

export default LogIn
