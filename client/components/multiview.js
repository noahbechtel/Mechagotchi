import React, { Component } from 'react'
import Tile from './tile'

const Multiview = props => {
  console.log(props)
  const parts = props.part
  return (
    <div className='catalog'>
      {parts.length !== 0 ? (
        parts.map(part => {
          return <Tile part={part} key='part.id' />
        })
      ) : (
        <p>Nothing's here, dipshit</p>
      )}
    </div>
  )
}

export default Multiview
