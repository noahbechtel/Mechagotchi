import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as PIXI from 'pixi.js'
import history from '../history'
import getInv from '../store/user'

class Hanger extends Component {
  constructor () {
    super()
  }

  componentDidMount () {
    if (this.props.mech.base.imgurl) {
      this.props.history.push('/login')
    }
    const mech = this.props.mech

    const defense = mech.base.defense + mech.armor.defense
    const attack = mech.leftWeapon.damage + mech.rightWeapon.damage
    const level = mech.level
    // Setup
    const goScan = () => {
      history.push('/scan')
    }
    const goArmory = () => {
      history.push('/armory')
    }
    let app = new PIXI.Application({
      width: window.screen.availWidth,
      height: window.screen.availHeight,
      antialias: false,
      transparent: true,
      resolution: 0.96
    })

    PIXI.loader.reset()
    app.renderer.autoResize = true
    let element = document.getElementById('mechViewport')
    element.append(app.view)

    // Loader

    const logo = new PIXI.Sprite.fromImage('./assets/format/logo.png')
    const hanger = new PIXI.Sprite.fromImage('./assets/format/hanger.png')
    const base = new PIXI.Sprite.fromImage(mech.base.imgUrl)
    const leftWeapon = new PIXI.Sprite.fromImage(mech.leftWeapon.imgUrl)
    const rightWeapon = new PIXI.Sprite.fromImage(mech.rightWeapon.imgUrl)

    app.stage.addChild(hanger)
    app.stage.addChild(base)
    // app.stage.addChild(logo)
    app.stage.addChild(leftWeapon)
    app.stage.addChild(rightWeapon)

    logo.x = app.screen.width - 400
    logo.y = 10
    hanger.anchor.set(0.5, 0.5)
    hanger.scale.set(0.22)
    hanger.x = app.screen.width / 2
    hanger.y = app.screen.height / 2
    base.anchor.set(0.5, 0.5)

    if (mech.base.class === 'Heavy Mech') {
      base.scale.set(1.5)
      base.x = app.screen.width / 2
      base.y = hanger.y - 120
    } else {
      base.x = hanger.x
      base.y = hanger.y - 100
      base.scale.set(1)
    }

    leftWeapon.anchor.set(1, 0.5)
    leftWeapon.x = base.x + mech.base.rightArm_X
    leftWeapon.scale.x = -1
    leftWeapon.y = base.y + mech.base.rightArm_Y

    rightWeapon.anchor.set(0, 0.5)
    rightWeapon.x = base.x + mech.base.leftArm_X
    rightWeapon.y = base.y + mech.base.leftArm_Y
    //   app.stage.addChild(armor)

    // TEXT

    let attackText = new PIXI.Text(`DMG:${attack}`, {
      fontFamily: 'courier',
      fontSize: 36,
      fill: 0xffffff
    })
    let defenseText = new PIXI.Text(`DEF:${defense}`, {
      fontFamily: 'courier',
      fontSize: 36,
      fill: 0xffffff
    })
    let levelText = new PIXI.Text(`LVL:${level}`, {
      fontFamily: 'courier',
      fontSize: 36,
      fill: 0xffffff
    })
    app.stage.addChild(defenseText)
    app.stage.addChild(attackText)
    defenseText.y = 90
    attackText.y = 40
    levelText.y = 60
    attackText.x = hanger.x - 150
    levelText.x =  hanger.x - 100
    defenseText.x =  hanger.x - 150

    // buttons
    const armory = new PIXI.Sprite.fromImage('./assets/format/armory.png')
    armory.scale.set(0.4)
    armory.anchor.set(0.5, 0.5)
    armory.interactive = true
    armory.buttonMode = true
    armory.on('click', goArmory)
    armory.on('touchend', goArmory)
    app.stage.addChild(armory)
    armory.y = app.screen.height - 100
    armory.x = app.screen.width / 2

    const scan = new PIXI.Sprite.fromImage('./assets/format/scan.png')
    scan.scale.set(0.4)
    scan.interactive = true
    scan.buttonMode = true
    scan.on('click', goScan)
    scan.on('touchend', goScan)
    app.stage.addChild(scan)
    scan.anchor.set(0.5, 0.5)
    scan.y = app.screen.height - 200
    scan.x = app.screen.width / 2
    // console.log('setup finished')

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
    mech: state.mech,
    user: state.user,
    info: state.info
  }
}
const mapDispatch = dispatch => {
  return {
    getInv () {
      dispatch(getInv())
    }
  }
}

const ConnectedHanger = connect(
  mapState,
  mapDispatch
)(Hanger)
export default ConnectedHanger
