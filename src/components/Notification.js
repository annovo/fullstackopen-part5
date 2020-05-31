import React from 'react'

const Notification = ({ message }) => {
    if(!message) {
        return null
    }

    let messageStyle = {
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    switch(message.styleType){
        case 'success':
            messageStyle.color = 'green'
            break
        case 'error':
            messageStyle.color = 'red'
            break
        default:
            messageStyle.color = 'green'
    }

    return (
        <div style = {messageStyle}>
            {message.message}
        </div>
    )
}

export default Notification