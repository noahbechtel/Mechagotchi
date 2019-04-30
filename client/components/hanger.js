import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as PIXI from 'pixi.js'
import history from '../history'
class Hanger extends Component {
  constructor () {
    super()
  }

  componentDidMount () {
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
      width: window.screen.availWidth, // default: 800
      height: window.screen.availHeight, // default: 600
      antialias: true, // default: false
      transparent: true, // default: false
      resolution: 1 // default: 1
    })

    PIXI.loader.reset()
    app.renderer.autoResize = true
    // app.renderer.backgroundColor = 0x061639
    let element = document.getElementById('mechViewport')
    element.append(app.view)

    // Loader

    let assetAddresses
    assetAddresses = [
      //   mech.armor.imgUrl,
      mech.base.imgUrl,
      mech.leftWeapon.imgUrl,
      './assets/format/logo.png',
      './assets/format/hanger.png'
    ]

    if (mech.leftWeapon.imgUrl !== mech.rightWeapon.imgUrl) {
      assetAddresses.push(mech.rightWeapon.imgUrl)
    }
    console.log(assetAddresses)
    PIXI.loader.add(assetAddresses).load(() => {
      const logo = new PIXI.Sprite(
        PIXI.loader.resources['./assets/format/logo.png'].texture
      )
      const hanger = new PIXI.Sprite(
        PIXI.loader.resources['./assets/format/hanger.png'].texture
      )
      const base = new PIXI.Sprite(
        PIXI.loader.resources[mech.base.imgUrl].texture
      )
      const leftWeapon = new PIXI.Sprite(
        PIXI.loader.resources[mech.leftWeapon.imgUrl].texture
      )
      let rightWeapon
      if (assetAddresses.length === 2) {
        rightWeapon = new PIXI.Sprite(
          PIXI.loader.resources[mech.leftWeapon.imgUrl].texture
        )
      } else {
        rightWeapon = new PIXI.Sprite(
          PIXI.loader.resources[mech.rightWeapon.imgUrl].texture
        )
      }
      // const armor = new PIXI.Sprite(
      //   PIXI.loader.resources[mech.armor.imgUrl].texture
      // )
      app.stage.addChild(hanger)
      app.stage.addChild(base)
      // app.stage.addChild(logo)
      app.stage.addChild(leftWeapon)
      app.stage.addChild(rightWeapon)

      // logo.scale.set(0.25)
      logo.x = app.screen.width - 400
      logo.y = 10
      hanger.anchor.set(0.5, 0.5)
      hanger.scale.set(0.22)
      hanger.x = app.screen.width / 2
      hanger.y = app.screen.height / 2
      base.x = app.screen.width / 2.65
      base.y = hanger.y - 200
      if (mech.base.class === 'Heavy Mech') {
        console.log(base.scale)
        base.scale.set(1.5)
      } else {
        base.scale.set(1)
      }

      leftWeapon.anchor.set(0.5, 1)
      leftWeapon.x = base.x + mech.base.rightArm_X
      leftWeapon.scale.x = -1
      leftWeapon.y = base.y + mech.base.rightArm_Y

      rightWeapon.anchor.set(1, 0.5)
      rightWeapon.x = base.x + mech.base.leftArm_X
      rightWeapon.y = base.y + mech.base.leftArm_Y
      //   app.stage.addChild(armor)

      // TEXT

      let attackText = new PIXI.Text(`DMG:${attack}`, {
        fontFamily: 'helvetica',
        fontSize: 36
      })
      let defenseText = new PIXI.Text(`DEF:${defense}`, {
        fontFamily: 'helvetica',
        fontSize: 36
      })
      let levelText = new PIXI.Text(`LVL:${level}`, {
        fontFamily: 'helvetica',
        fontSize: 36
      })
      app.stage.addChild(defenseText)
      app.stage.addChild(attackText)
      app.stage.addChild(levelText)
      defenseText.y = 50
      levelText.y = 100
      attackText.x = app.screen.width / 2.7
      levelText.x = app.screen.width / 2.7
      defenseText.x = app.screen.width / 2.7

      // buttons
      const armory = new PIXI.Sprite.fromImage('./assets/format/armory.png')
      armory.scale.set(0.4)
      armory.interactive = true
      armory.buttonMode = true
      armory.on('click', goArmory)
      armory.on('touchend', goArmory)
      app.stage.addChild(armory)
      armory.anchor.set(0.5, 0.5)
      armory.y = app.screen.width + 100
      armory.x = app.screen.width / 2

      const scan = new PIXI.Sprite.fromImage('./assets/format/scan.png')
      scan.scale.set(0.4)
      scan.interactive = true
      scan.buttonMode = true
      scan.on('click', goScan)
      scan.on('touchend', goScan)
      app.stage.addChild(scan)
      scan.anchor.set(0.5, 0.5)
      scan.y = app.screen.width + 200
      scan.x = app.screen.width / 2
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
    mech: state.mech,
    user: state.user,
    info: state.info,
    pixi: state.info.pixi
  }
}

const ConnectedHanger = connect(mapState)(Hanger)
export default ConnectedHanger
