import React, { useState } from 'react'

const Login = ({ createUser }) => {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const usernameChange = (event) => {
    setUsername(event.target.value)
  }
  const passwordChange = (event) => {
    setPassword(event.target.value)
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    createUser({username, password})
    setPassword('')
    setUsername('')
  }

  return (
    <div>
      <h2>Login to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="username"
            onChange={usernameChange}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="password"
            onChange={passwordChange}
          />
        </div>
        <button id = 'login-button' type="submit">login</button>
      </form>
    </div>
  )
}
export default Login
