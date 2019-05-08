import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as PIXI from 'pixi.js'
import me, { getInv } from '../store/user'

class Builder extends Component {
  constructor () {
    super()
  }

  componentDidMount () {
    this.props.getInv(this.props.user.inventoryId)
    let app = new PIXI.Application({
      width: window.screen.availWidth, // default: 800
      height: window.screen.availHeight * 0.7, // default: 600
      antialias: true, // default: false
      transparent: true, // default: false
      resolution: 1 // default: 1
    })
    app.renderer.autoResize = true
    // app.renderer.backgroundColor = 0x061639
    let element = document.getElementById('builderViewport')
    element.append(app.view)
    const logo = new PIXI.Sprite.fromImage('./assets/format/logo.png')
    logo.anchor.set(0.5, 0.5)
    let build = new PIXI.Text(`BUILD`, {
      fontFamily: 'Arial',
      fontSize: 36
    })

    // Set the initial position
    build.anchor.set(0.5)
    build.x = app.screen.width / 2
    build.y = app.screen.height / 2 + 60
    logo.y = app.screen.height / 2
    logo.x = app.screen.width / 2

    build.interactive = true
    build.buttonMode = true

    // Pointers normalize touch and mouse
    build.on('pointerdown', () => {
      this.props.history.push('/hanger')
    })

    // Alternatively, use the mouse & touch events:
    // sprite.on('click', onClick); // mouse-only
    // sprite.on('tap', onClick); // touch-only
    logo.scale.set(0.5)
    app.stage.addChild(build)
    app.stage.addChild(logo)
  }

  render () {
    // console.log('wtf')
    return (
      <div className='pixi'>
        <div id='builderViewport'>{'   '}</div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    mech: state.mech,
    user: state.user,
    info: state.info,
    pixi: state.info.pixi
  }
}
const mapDispatch = dispatch => {
  return {
    getInv () {
      dispatch(getInv())
    }
  }
}

const ConnectedBuilder = connect(
  mapState,
  mapDispatch
)(Builder)
export default ConnectedBuilder
