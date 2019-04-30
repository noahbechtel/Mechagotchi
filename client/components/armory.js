import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withRouter, Route, Switch } from 'react-router-dom'
import Multiview from './multiview'

const Armory = props => {
  return (
    <div className='hanger'>
      <img
        className='back'
        src='./assets/format/left.png'
        onClick={() => {
          props.history.push('/left')
        }}
      />
      <img
        className='back'
        src='./assets/format/right.png'
        onClick={() => {
          props.history.push('/right')
        }}
      />
      <img
        className='back'
        src='./assets/format/mechs.png'
        onClick={() => {
          props.history.push('/base')
        }}
      />
      <img
        className='back'
        src='./assets/format/armors.png'
        onClick={() => {
          props.history.push('/armor')
        }}
      />
      <img
        className='back'
        src='./assets/format/back.png'
        onClick={() => {
          props.history.push('/hanger')
        }}
      />
    </div>
  )
}
const mapState = state => {
  return {
    inv: state.user.inv
  }
}

const ArmoryConnected = connect(mapState)(Armory)
export default ArmoryConnected
