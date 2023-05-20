import React from 'react'

const Error = ({message}) => {
  return (
    <div style={{textAlign: "center", color: "red", backgroundColor: "#FFCCCB", padding: "10px 0"}}>{message}</div>
  )
}

export default Error