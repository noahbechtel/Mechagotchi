import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as PIXI from 'pixi.js'

class Hanger extends Component {
  constructor () {
    super()
  }
  componentDidMount () {
    let app = new PIXI.Application({
      width: screen.width, // default: 800
      height: screen.height, // default: 600
      antialias: true, // default: false
      transparent: false, // default: false
      resolution: 1 // default: 1
    })
    app.renderer.backgroundColor = 0x061639
    let element = document.getElementById('mechViewport')
    element.append(app.view)
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
