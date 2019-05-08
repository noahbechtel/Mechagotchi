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

    // Enemy Mech
    let incomingMech, right, left, ar, bs
    switch (incoming.type) {
      case 'armor':
        incomingMech = new PIXI.Sprite.fromImage(incoming.imgUrl)

        break
      case 'rightWeapon':
        incomingMech = new PIXI.Sprite.fromImage(incoming.imgUrl)

        break
      case 'leftWeapon':
        incomingMech = new PIXI.Sprite.fromImage(incoming.imgUrl)

        break
      case 'base':
        right = new PIXI.Sprite.fromImage(incoming.rightWeapon.imgUrl)
        left = new PIXI.Sprite.fromImage(incoming.leftWeapon.imgUrl)
        bs = new PIXI.Sprite.fromImage(incoming.base.imgUrl)

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
      const start = new PIXI.Sprite.fromImage('./assets/format/start.png')
      start.anchor.set(0.5, 0.5)
      start.scale.set(0.2)
      app.stage.addChild(start)
      start.interactive = true
      start.buttonMode = true
      start.x = app.screen.width / 2
      start.y = app.screen.height / 2

      let startGame = () => {
        app.stage.removeChild(start)
        app.stage.addChild(incomingMech.base)
        app.stage.addChild(incomingMech.leftWeapon)
        app.stage.addChild(incomingMech.rightWeapon)
        incomingMech.base.anchor.set(0.5, 0.5)
        incomingMech.base.x = app.screen.width / 2
        incomingMech.base.y = app.screen.height / 3
        if (incoming.base.class === 'Heavy Mech') {
          incomingMech.base.scale.set(1.5)
        } else {
          incomingMech.base.scale.set(1)
        }
        incomingMech.leftWeapon.anchor.set(1, 0.5)

        incomingMech.leftWeapon.x =
          incomingMech.base.x + incoming.base.rightArm_X
        incomingMech.leftWeapon.scale.x = -1
        incomingMech.leftWeapon.y =
          incomingMech.base.y + incoming.base.rightArm_Y
        incomingMech.rightWeapon.anchor.set(0, 0.5)
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
        leftButton.anchor.set(0.5, 0.5)
        leftButton.x = app.screen.width / 2 - 150
        leftButton.y = app.screen.height - 100
        app.stage.addChild(leftButton)

        const rightButton = new PIXI.Sprite.fromImage(
          './assets/format/rightButton.png'
        )
        rightButton.scale.set(0.2)
        rightButton.anchor.set(0.5, 0.5)
        rightButton.x = app.screen.width / 2 + 150
        rightButton.y = app.screen.height - 100

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

        playerHealthBar.y = leftButton.y - playerHealth - 10
        playerHealthBar.x = app.screen.width / 2 - 26

        const leftOverlay = new PIXI.Sprite.fromImage(
          './assets/format/heat.png'
        )
        leftOverlay.anchor.set(0.5, 0.5)
        leftOverlay.scale.set(0.44)

        const rightOverlay = new PIXI.Sprite.fromImage(
          './assets/format/heat.png'
        )
        rightOverlay.anchor.set(0.5, 0.5)
        rightOverlay.scale.set(0.44)

        const playerHealthOverlay = new PIXI.Sprite.fromImage(
          './assets/format/health.png'
        )
        playerHealthOverlay.anchor.set(0.5, 0.5)
        playerHealthOverlay.scale.set(0.44)

        app.stage.addChild(leftOverlay)
        app.stage.addChild(rightOverlay)
        app.stage.addChild(playerHealthOverlay)

        app.ticker.add(delta => gameLoop(delta))

        let buffer = 0
        let rightHeat = 0
        let leftHeat = 0
        let leftEmergency = 0
        let rightEmergency = 0
        const enemyMaxHealth = enemyHealth
        const playerMaxHealth = playerHealth
        let counter = 0
        let enemyRightHeat = 0
        let enemyLeftHeat = 0
        let enemyBuffer = 30
        let right = true

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

          app.stage.addChild(playerHealthOverlay)
          playerHealthOverlay.x = app.screen.width / 2
          playerHealthOverlay.y = playerHealthBar.y + 100
          app.stage.addChild(rightButton)
          app.stage.addChild(leftButton)

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

          app.stage.addChild(leftOverlay)
          leftCoolDown.y = leftButton.y - leftInnerBar.height - 80
          leftCoolDown.x = leftButton.x - 45
          leftOverlay.x = leftButton.x
          leftOverlay.y = leftCoolDown.y + 65

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
          rightCoolDown.addChild(rightOuterBar)

          app.stage.addChild(rightOverlay)
          rightCoolDown.y = rightButton.y - rightInnerBar.height - 80
          rightCoolDown.x = rightButton.x - 50
          rightOverlay.x = rightButton.x
          rightOverlay.y = rightCoolDown.y + 65

          // player attack functions
          const leftCallback = () => {
            if (leftHeat < 150 && buffer === 0 && leftEmergency === 0) {
              if (leftHeat + leftAttack * 3 > 150) {
                leftEmergency = 150
                leftHeat = 150
              } else {
                enemyHealth -= leftAttack / 2
                leftHeat += leftAttack * 3
                buffer = 1
              }
            }
          }
          const rightCallback = () => {
            if (rightHeat < 150 && buffer === 0 && rightEmergency === 0) {
              if (rightHeat + rightAttack * 3 > 150) {
                rightEmergency = 150
                rightHeat = 150
              } else {
                enemyHealth -= rightAttack / 2
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

          // Enemy attacks
          if (right) {
            if (
              enemyRightHeat + enemyRightAttack * 3 < 150 &&
              enemyBuffer <= 0
            ) {
              playerHealth -= enemyRightAttack / 2
              enemyRightHeat += enemyRightAttack * 3
              enemyBuffer = 33
              right = false
            } else {
              enemyRightHeat -= 0.3
              --enemyBuffer
            }
          } else {
            if (enemyLeftHeat + enemyLeftAttack * 3 < 150 && enemyBuffer <= 0) {
              playerHealth -= enemyLeftAttack / 2
              enemyLeftHeat += enemyLeftAttack * 3
              enemyBuffer = 33
              right = true
            } else {
              enemyLeftHeat -= 0.3
              --enemyBuffer
            }
          }
          // EndGame
          if (playerHealth <= 0) {
            const boom = new PIXI.Graphics()
            boom.beginFill(0xffffff)
            boom.drawRect(0, 0, app.screen.width, app.screen.height)
            boom.endFill()
            app.stage.addChild(boom)
            boom.alpha = counter
            if (counter >= 10) {
              let text = new PIXI.Text(
                `Mech Destoryed. Commencing Repairs... \n Touch to return to Hanger`,
                {
                  fontFamily: 'courier',
                  fontSize: 20
                }
              )
              app.stage.addChild(text)
              text.x = app.screen.width / 2
              text.y = app.screen.height / 2 + 100
              text.interactive = true
              text.buttonMode = true
              let goHanger = () => {
                this.props.history.push('/hanger')
              }
              text.on('click', goHanger)
              text.on('touchend', goHanger)
              app.stop()
            }
          } else {
            counter += 0.5
          }
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
              prize.anchor.set(0.5, 0.5)
              app.stage.addChild(text)
              app.stage.addChild(prize)
              text.x = app.screen.width / 2 - 100
              text.y = app.screen.height / 2 + 100
              prize.x = app.screen.width / 2
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
        }
      }
      start.on('click', startGame)
      start.on('touchend', startGame)

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
