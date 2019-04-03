import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as PIXI from 'pixi.js'
import { setPixi } from '../store/info'

class Hanger extends Component {
  constructor () {
    super()
    this.state = {
      initilized: false
    }
  }
  componentDidMount () {
    const mech = this.props.user.mech

    // Setup
    let app = new PIXI.Application({
      width: window.screen.availWidth, // default: 800
      height: window.screen.availHeight * 0.7, // default: 600
      antialias: true, // default: false
      transparent: true, // default: false
      resolution: 1 // default: 1
    })
    app.renderer.autoResize = true
    // app.renderer.backgroundColor = 0x061639
    let element = document.getElementById('mechViewport')
    element.append(app.view)

    // Loader

    let assetAddresses
    if (!this.props.pixi) {
      assetAddresses = [
        //   mech.armor.imgUrl,
        mech.base.imgUrl,
        mech.leftWeapon.imgUrl
      ]
      this.props.setPixi()
    } else {
      assetAddresses = []
    }
    if (!mech.leftWeapon.imgUrl === mech.rightWeapon.imgUrl) {
      assetAddresses.push(mech.rightWeapon.imgUrl)
    }
    this.setState({ initilized: true })
    PIXI.loader.add(assetAddresses).load(() => {
      const base = new PIXI.Sprite(
        PIXI.loader.resources[mech.base.imgUrl].texture
      )
      const leftWeapon = new PIXI.Sprite(
        PIXI.loader.resources[mech.leftWeapon.imgUrl].texture
      )
      const rightWeapon = new PIXI.Sprite(
        PIXI.loader.resources[
          mech.rightWeapon.imgUrl || mech.leftWeapon.imgUrl
        ].texture
      )
      // const armor = new PIXI.Sprite(
      //   PIXI.loader.resources[mech.armor.imgUrl].texture
      // )
      app.stage.addChild(base)
      app.stage.addChild(leftWeapon)
      app.stage.addChild(rightWeapon)
      base.x = window.screen.availWidth * 0.25
      base.y = 100
      leftWeapon.x = base.x + mech.base.rightArm_X
      leftWeapon.y = base.y + mech.base.rightArm_Y
      rightWeapon.x = base.x + mech.base.leftArm_X
      rightWeapon.y = base.y + mech.base.leftArm_Y
      //   app.stage.addChild(armor)
      console.log('setup finished')
    })

    // Assignment
  }

  render () {
    return (
      <div className='pixi'>
        <div id='mechViewport'>{'   '}</div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    mech: state.user.mech,
    user: state.user,
    info: state.info,
    pixi: state.info.pixi
  }
}
const mapDispatch = dispatch => {
  return {
    setPixi () {
      dispatch(setPixi())
    }
  }
}

const ConnectedHanger = connect(
  mapState,
  mapDispatch
)(Hanger)
export default ConnectedHanger
