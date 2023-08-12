import React from 'react'

const HighLightText = ({text ,color}) => {
  return (
    <span className={` font-bold ${color}`}>
        {text}
    </span>
  )
}

export default HighLightText