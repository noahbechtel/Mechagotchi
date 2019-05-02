import React, { Component } from 'react'
import Tile from './tile'
import { Link } from 'react-router-dom'
import history from '../history'

const Multiview = props => {
  console.log(props)
  const parts = props.part
  return (
    <div>
      <div className='catalog'>
        {parts.length !== 0 ? (
          parts.map(part => <Tile part={part} key={part.id} />)
        ) : (
          <div>
            <p>Nothing's here, dipshit</p>
          </div>
        )}
      </div>
      <div className='hanger'>
        <img
          className='back'
          src='./assets/format/confirm.png'
          onClick={() => {
            history.push('/armory')
          }}
        />
      </div>
    </div>
  )
}

export default Multiview
