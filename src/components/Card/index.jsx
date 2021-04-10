import React from 'react'
import './Card.css'
const Card = ({children, className}) => {
  return (
    <div className={`${className?className:''} card`}>
      {children}
    </div>
  )
}

export default Card
