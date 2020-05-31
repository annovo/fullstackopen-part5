import React from 'react'

const LoggedUser = ({ name, onClick}) => (
  <div>
    {name} is logged in {' '} 
    <button onClick = {onClick}>logout</button>
  </div>
)

export default LoggedUser