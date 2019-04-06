import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withRouter, Route, Switch } from 'react-router-dom'
import Multiview from './multiview'

const Armory = () => {
  return (
    <div>
      <Link to='/left'>Left Arms</Link>
      <Link to='/right'>Right Arms</Link>
      <Link to='/base'>Mechs</Link>
      <Link to='/armor'>Armor</Link>
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
