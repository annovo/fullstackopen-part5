import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return {
      toggleVisible
    }
  })

  if (visible) {
    return (
      <div>
        <button onClick={toggleVisible}>{props.secondButtonLabel}</button>
        {props.children}
      </div>
    )
  } else {
    return (
      <div>
        <button onClick={toggleVisible}>{props.firstButtonLabel}</button>
      </div>
    )
  }
})

export default Togglable
