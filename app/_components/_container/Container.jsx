import React from 'react'

const Container = ({children}) => {
  return (
    <div className='max-w-container mx-auto px-[10px] h-full'>{children}</div>
  )
}

export default Container