import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return {
      toggleVisible,
    }
  })

  const buttonStyle = {
    margin: 5,
    padding: 4
  }

  const buttonPosition = () => {
    if (props.buttonUp) {
      return (
        <div>
          <button style = {buttonStyle} onClick={toggleVisible}>{props.secondButtonLabel}</button>
          {props.children}
        </div>
      )
    } else {
      return (
        <div>
          {props.children}
          <button style = {buttonStyle} onClick={toggleVisible}>{props.secondButtonLabel}</button>
        </div>
      )
    }
  }

  if (visible) {
    return <>{buttonPosition()}</>
  } else {
    return (
      <div>
        <button style = {buttonStyle} onClick={toggleVisible}>{props.firstButtonLabel}</button>
      </div>
    )
  }
})

Togglable.propTypes = {
  firstButtonLabel: PropTypes.string.isRequired,
  secondButtonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'
export default Togglable
