import React from 'react'

const IconButton = ({text,onClick,disabled,customClasses,type,children}) => {
  return (
   <>
     <button
     disabled={disabled}
     type={type}
     onClick={onClick}
     className={customClasses}
     children={true}
     >
       {
        children ? (
          <span>
            {text}
          </span>
        )
        : (text)
       }
     </button>
   </>
  )
}

export default IconButton