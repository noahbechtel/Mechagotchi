import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as PIXI from 'pixi.js'

class Hanger extends Component {
  constructor () {
    super()
  }
  componentDidMount () {
    let pixi = new PIXI.Application({
      width: window.innerWidth, // default: 800
      height: window.innerHeight, // default: 600
      antialias: true, // default: false
      transparent: false, // default: false
      resolution: 1 // default: 1
    })
    let element = document.getElementById('mechViewport')
    element.append(pixi.view)
  }
  render () {
    return <div id='mechViewport'>{'   '}</div>
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    mech: state.user.mech,
    user: state.user,
    info: state.info
  }
}

const ConnectedHanger = connect(mapState)(Hanger)
export default ConnectedHanger
