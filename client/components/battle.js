import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as PIXI from 'pixi.js'
import { addPart } from '../store/user'
import { getInv } from '../store/user'
class Battle extends Component {
  constructor () {
    super()
  }

  componentDidMount () {
    const mech = this.props.mech
    // const level = mech.level
    const incoming = this.props.incoming
    console.log(incoming)
    if (!incoming) {
      this.props.history.push('/scan')
    }
    // Setup

    let app = new PIXI.Application({
      width: window.screen.availWidth, // default: 800
      height: window.screen.availHeight, // default: 600
      antialias: true, // default: false
      transparent: true, // default: false
      resolution: 1 // default: 1
    })
    app.renderer.plugins.interaction.interactionFrequency = 1000
    PIXI.loader.reset()
    app.renderer.autoResize = true
    let element = document.getElementById('mechViewport')
    element.append(app.view)

    // Loader

    // Your Mech
    let assetAddresses
    assetAddresses = [
      mech.armor.imgUrl,
      mech.base.imgUrl,
      mech.leftWeapon.imgUrl
    ]

    if (mech.leftWeapon.imgUrl !== mech.rightWeapon.imgUrl) {
      assetAddresses.push(mech.rightWeapon.imgUrl)
    }

    PIXI.loader.add(assetAddresses).load(() => {
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

      // Enemy Mech
      let incomingMech, right, left, ar, bs
      switch (incoming.type) {
        case 'armor':
          if (incoming.imgUrl !== mech.armor.imgUrl) {
            incomingMech = new PIXI.Sprite.fromImage(incoming.imgUrl)
          } else {
            incomingMech = new PIXI.Sprite(
              PIXI.loader.resources[mech.armor.imgUrl].texture
            )
          }
          break
        case 'rightWeapon':
          if (incoming.imgUrl !== mech.rightWeapon.imgUrl) {
            incomingMech = new PIXI.Sprite.fromImage(incoming.imgUrl)
          } else {
            incomingMech = new PIXI.Sprite(
              PIXI.loader.resources[mech.rightWeapon.imgUrl].texture
            )
          }
          break
        case 'leftWeapon':
          if (incoming.imgUrl !== mech.leftWeapon.imgUrl) {
            incomingMech = new PIXI.Sprite.fromImage(incoming.imgUrl)
          } else {
            incomingMech = new PIXI.Sprite(
              PIXI.loader.resources[mech.leftWeapon.imgUrl].texture
            )
          }
          break
        case 'base':
          if (incoming.rightWeapon.imgUrl !== mech.rightWeapon.imgUrl) {
            right = new PIXI.Sprite.fromImage(incoming.rightWeapon.imgUrl)
          } else {
            right = new PIXI.Sprite(
              PIXI.loader.resources[mech.rightWeapon.imgUrl].texture
            )
          }
          if (incoming.leftWeapon.imgUrl !== mech.leftWeapon.imgUrl) {
            left = new PIXI.Sprite.fromImage(incoming.leftWeapon.imgUrl)
          } else {
            left = new PIXI.Sprite(
              PIXI.loader.resources[mech.leftWeapon.imgUrl].texture
            )
          }
          if (incoming.base.imgUrl !== mech.base.imgUrl) {
            bs = new PIXI.Sprite.fromImage(incoming.base.imgUrl)
          } else {
            bs = new PIXI.Sprite(
              PIXI.loader.resources[mech.base.imgUrl].texture
            )
          }

          incomingMech = {
            rightWeapon: right,
            leftWeapon: left,
            armor: ar,
            base: bs
          }
          console.log(incomingMech)
          break

        default:
          break
      }

      // End Loader

      // PIXI render
      if (incoming.base) {
        app.stage.addChild(incomingMech.base)
        app.stage.addChild(incomingMech.leftWeapon)
        app.stage.addChild(incomingMech.rightWeapon)
        incomingMech.base.x = app.screen.width / 2 - 75
        incomingMech.base.y = 50
        if (incoming.base.class === 'Heavy Mech') {
          incomingMech.base.scale.set(1.5)
        } else {
          incomingMech.base.scale.set(1)
        }
        incomingMech.leftWeapon.anchor.set(0.5, 1)

        incomingMech.leftWeapon.x =
          incomingMech.base.x + incoming.base.rightArm_X
        incomingMech.leftWeapon.scale.x = -1
        incomingMech.leftWeapon.y =
          incomingMech.base.y + incoming.base.rightArm_Y
        incomingMech.rightWeapon.anchor.set(1, 0.5)
        incomingMech.rightWeapon.x =
          incomingMech.base.x + incoming.base.leftArm_X
        incomingMech.rightWeapon.y =
          incomingMech.base.y + incoming.base.leftArm_Y

        let playerHealth = mech.base.defense + mech.armor.defense + 100
        const leftAttack = mech.leftWeapon.damage
        const rightAttack = mech.rightWeapon.damage
        let enemyHealth = incoming.base.defense + 100
        const enemyRightAttack = incoming.rightWeapon.damage
        const enemyLeftAttack = incoming.leftWeapon.damage

        console.log(mech)
        // Interactive GUI
        const leftButton = new PIXI.Sprite.fromImage(
          './assets/format/leftButton.png'
        )
        leftButton.scale.set(0.2)
        leftButton.x = 10
        leftButton.y = app.screen.height - 120
        app.stage.addChild(leftButton)

        const rightButton = new PIXI.Sprite.fromImage(
          './assets/format/rightButton.png'
        )
        rightButton.scale.set(0.2)
        rightButton.x = app.screen.width - 130
        rightButton.y = app.screen.height - 120
        app.stage.addChild(rightButton)

        rightButton.interactive = true
        rightButton.buttonMode = true
        leftButton.interactive = true
        leftButton.buttonMode = true

        const playerHealthBar = new PIXI.Container()
        app.stage.addChild(playerHealthBar)
        const enemyHealthBar = new PIXI.Container()
        app.stage.addChild(enemyHealthBar)

        enemyHealthBar.y = enemyHealth / 2 - 10
        enemyHealthBar.x = 10

        playerHealthBar.y = leftButton.y - enemyHealth - 10
        playerHealthBar.x = app.screen.width / 2 - 25

        app.ticker.add(delta => gameLoop(delta))

        let buffer = 0
        let rightHeat = 0
        let leftHeat = 0
        let leftEmergency = 0
        let rightEmergency = 0
        let enemyMaxHealth = enemyHealth
        let playerMaxHealth = playerHealth
        let counter = 0

        const gameLoop = delta => {
          // enemy healthbar

          const enemyInnerBar = new PIXI.Graphics()
          enemyInnerBar.beginFill(0x000000)
          enemyInnerBar.drawRect(0, 0, 15, enemyMaxHealth)
          enemyInnerBar.endFill()
          enemyHealthBar.addChild(enemyInnerBar)

          const enemyOuterBar = new PIXI.Graphics()
          enemyOuterBar.beginFill(0xff3300)
          enemyOuterBar.drawRect(0, 0, 15, enemyHealth)
          enemyOuterBar.endFill()
          enemyHealthBar.addChild(enemyOuterBar)

          // player healthbar

          const playerInnerBar = new PIXI.Graphics()
          playerInnerBar.beginFill(0x000000)
          playerInnerBar.drawRect(0, 0, 50, playerMaxHealth)
          playerInnerBar.endFill()
          playerHealthBar.addChild(playerInnerBar)

          const playerOuterBar = new PIXI.Graphics()
          playerOuterBar.beginFill(0x6b8e23)
          playerOuterBar.drawRect(0, 0, 50, playerHealth)
          playerOuterBar.endFill()
          playerHealthBar.addChild(playerOuterBar)

          // left cooldown

          const leftCoolDown = new PIXI.Container()
          app.stage.addChild(leftCoolDown)
          const leftInnerBar = new PIXI.Graphics()
          leftInnerBar.beginFill(0x000000)
          leftInnerBar.drawRect(0, 0, 90, 150)
          leftInnerBar.endFill()
          leftCoolDown.addChild(leftInnerBar)

          const leftOuterBar = new PIXI.Graphics()
          leftOuterBar.beginFill(0xff3300)
          leftOuterBar.drawRect(0, 0, 90, leftHeat)
          leftOuterBar.endFill()
          leftCoolDown.heat = leftOuterBar.height
          leftCoolDown.addChild(leftOuterBar)

          leftCoolDown.y = leftButton.y - leftInnerBar.height - 10
          leftCoolDown.x = leftButton.x + 10

          // right cooldown

          const rightCoolDown = new PIXI.Container()
          app.stage.addChild(rightCoolDown)
          const rightInnerBar = new PIXI.Graphics()
          rightInnerBar.beginFill(0x000000)
          rightInnerBar.drawRect(0, 0, 90, 150)
          rightInnerBar.endFill()
          rightCoolDown.addChild(rightInnerBar)

          const rightOuterBar = new PIXI.Graphics()
          rightOuterBar.beginFill(0xff3300)
          rightOuterBar.drawRect(0, 0, 90, rightHeat)
          rightOuterBar.endFill()
          rightCoolDown.heat = rightOuterBar.height
          rightCoolDown.addChild(rightOuterBar)

          rightCoolDown.y = rightButton.y - rightInnerBar.height - 10
          rightCoolDown.x = rightButton.x + 10

          // player attack functions
          const leftCallback = () => {
            if (leftHeat < 150 && buffer === 0 && !leftEmergency) {
              if (leftHeat + leftAttack * 3 > 150) {
                leftEmergency = 150
                leftHeat = 150
              } else {
                enemyHealth -= leftAttack
                leftHeat += leftAttack * 3
                buffer = 1
              }
            }
          }
          const rightCallback = () => {
            if (rightHeat < 150 && buffer === 0 && !rightEmergency) {
              if (rightHeat + rightAttack * 3 > 150) {
                rightEmergency = 150
                rightHeat = 150
              } else {
                enemyHealth -= rightAttack
                rightHeat += rightAttack * 3
                buffer = 1
              }
            }
          }

          rightButton.on('click', rightCallback)
          rightButton.on('touchend', rightCallback)
          leftButton.on('click', leftCallback)
          leftButton.on('touchend', leftCallback)

          // OverHeat

          if (rightEmergency > 0 && rightHeat > 0) {
            rightHeat -= 0.5
            rightEmergency -= 0.5
          } else {
            if (rightHeat > 0) rightHeat -= 0.5
          }

          if (leftEmergency > 0 && leftHeat > 0) {
            leftHeat -= 0.5
            leftEmergency -= 0.5
          } else {
            if (leftHeat > 0) leftHeat -= 0.5
          }
          if (buffer > 0) buffer -= 1

          // EndGame

          if (enemyHealth <= 0) {
            enemyHealthBar.removeChild(enemyOuterBar)
            const boom = new PIXI.Graphics()
            boom.beginFill(0xffffff)
            boom.drawRect(0, 0, app.screen.width, app.screen.height)
            boom.endFill()
            app.stage.addChild(boom)
            boom.alpha = counter
            if (counter >= 10) {
              this.props.addPart({ type: 'base', ...incoming.base })
              let prize = PIXI.Sprite.fromImage(incoming.base.imgUrl)
              let text = new PIXI.Text(`Salvage aquired!`, {
                fontFamily: 'courier',
                fontSize: 20
              })
              prize.scale.set(0.6)
              app.stage.addChild(text)
              app.stage.addChild(prize)
              text.x = app.screen.width / 2 - 100
              text.y = app.screen.height / 2 + 100
              prize.x = app.screen.width / 2 - 30
              prize.y = app.screen.height / 2 - 100
              prize.interactive = true
              prize.buttonMode = true
              let goHanger = () => {
                this.props.history.push('/hanger')
              }
              prize.on('click', goHanger)
              prize.on('touchend', goHanger)
              app.stop()
            } else {
              counter += 0.5
            }
          }

          console.log('HP:', playerHealth, 'EH:', enemyHealth, counter)
        }

        // End PIXI Render Setup
      } else {
        let text = new PIXI.Text(`Salvage aquired!`, {
          fontFamily: 'courier',
          fontSize: 20
        })
        app.stage.addChild(text)
        text.x = app.screen.width / 2 - 100
        text.y = app.screen.height / 2 + 100
        app.stage.addChild(incomingMech)
        incomingMech.anchor.set(0.5, 0.5)
        incomingMech.x = app.screen.width / 2
        incomingMech.y = app.screen.height / 2 - 100
        incomingMech.interactive = true
        incomingMech.buttonMode = true
        this.props.addPart(incoming)
        let goHanger = () => {
          this.props.history.push('/hanger')
        }
        incomingMech.on('click', goHanger)
        incomingMech.on('touchend', goHanger)
      }
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
    incoming: state.info.code
  }
}
const mapDispatch = dispatch => {
  return {
    addPart (part) {
      dispatch(addPart(part))
    },
    getInv () {
      dispatch(getInv())
    }
  }
}

const ConnectedBattle = connect(
  mapState,
  mapDispatch
)(Battle)
export default ConnectedBattle
