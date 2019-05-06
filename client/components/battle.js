import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as PIXI from 'pixi.js'
import { addPart } from '../store/info'
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
          // if (incoming.armor.imgUrl !== mech.armor.imgUrl) {
          //   ar = new PIXI.Sprite.fromImage(incoming.armor.imgUrl)
          // } else {
          //   ar = new PIXI.Sprite(
          //     PIXI.loader.resources[mech.armor.imgUrl].texture
          //   )
          // }
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
      // const armor = new PIXI.Sprite(
      //   PIXI.loader.resources[mech.armor.imgUrl].texture
      // )
      // End Loader

      // PIXI render
      if (incoming.base) {
        // app.stage.addChild(base)
        // app.stage.addChild(leftWeapon)
        // app.stage.addChild(rightWeapon)
        // base.x = app.screen.width / 3
        // base.y = app.screen.height - 80
        // leftWeapon.anchor.set(0.5, 1)
        // leftWeapon.x = base.x + mech.base.rightArm_X
        // leftWeapon.scale.x = -1
        // leftWeapon.y = base.y + mech.base.rightArm_Y
        // rightWeapon.anchor.set(1, 0.5)
        // rightWeapon.x = base.x + mech.base.leftArm_X
        // rightWeapon.y = base.y + mech.base.leftArm_Y
        // base.tint = 0x000000
        // if (mech.base.class === 'Heavy Mech') {
        //   base.scale.set(1.5)
        // } else {
        //   base.scale.set(1)
        // }
        // rightWeapon.tint = 0x000000
        // leftWeapon.tint = 0x000000
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
        let state

        // const fight = new PIXI.Sprite.fromImage('./assets/format/start.png')
        // fight.scale.set(0.1)
        // fight.interactive = true
        // fight.buttonMode = true
        // const playerHp = new PIXI.Text(`Health:${playerDefense}`, {
        //   fontFamily: 'Arial',
        //   fontSize: 36
        // })
        // const enemyHp = new PIXI.Text(`Health:${enemyHealth}`, {
        //   fontFamily: 'Arial',
        //   fontSize: 36
        // })
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

        // enemy healthbar
        const enemyHealthBar = new PIXI.Container()
        app.stage.addChild(enemyHealthBar)
        const enemyInnerBar = new PIXI.Graphics()
        enemyInnerBar.beginFill(0x000000)
        enemyInnerBar.drawRect(0, 0, 15, enemyHealth * 2)
        enemyInnerBar.endFill()
        enemyHealthBar.addChild(enemyInnerBar)

        const enemyOuterBar = new PIXI.Graphics()
        enemyOuterBar.beginFill(0xff3300)
        enemyOuterBar.drawRect(0, 0, 15, enemyHealth * 2)
        enemyOuterBar.endFill()
        enemyHealthBar.helth = enemyOuterBar.height
        enemyHealthBar.addChild(enemyOuterBar)

        // player healthbar
        const playerHealthBar = new PIXI.Container()
        app.stage.addChild(playerHealthBar)
        const playerInnerBar = new PIXI.Graphics()
        playerInnerBar.beginFill(0x000000)
        playerInnerBar.drawRect(0, 0, 50, playerHealth)
        playerInnerBar.endFill()
        playerHealthBar.addChild(playerInnerBar)

        const playerOuterBar = new PIXI.Graphics()
        playerOuterBar.beginFill(0x6b8e23)
        playerOuterBar.drawRect(0, 0, 50, playerHealth)
        playerOuterBar.endFill()
        playerHealthBar.health = playerOuterBar.height
        playerHealthBar.addChild(playerOuterBar)

        enemyHealthBar.y = enemyHealth / 2 - 10
        enemyHealthBar.x = 10

        playerHealthBar.y = leftButton.y - enemyHealth - 10
        playerHealthBar.x = app.screen.width / 2 - 25

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
        leftOuterBar.drawRect(0, 0, 90, 0)
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
        rightOuterBar.drawRect(0, 0, 90, 0)
        rightOuterBar.endFill()
        rightCoolDown.heat = rightOuterBar.height
        rightCoolDown.addChild(rightOuterBar)

        rightCoolDown.y = rightButton.y - rightInnerBar.height - 10
        rightCoolDown.x = rightButton.x + 10

        app.ticker.add(delta => gameLoop(delta))

        let buffer = 0
        let enemyCoolBuffer = 0
        let leftCoolBuffer = 0
        let rightCoolBuffer = 0
        let arm = 0
        let frames = 0
        const gameLoop = delta => {
          if (playerHealth < 0 || enemyHealth < 0) {
            app.stop()
          }

          // if (arm === 0) {
          //   playerHealth -= enemyLeftAttack
          //   arm = 1
          //   enemyCooldown = frames + 75
          // } else {
          //   playerHealth -= enemyRightAttack
          //   arm = 0
          //   enemyCooldown = frames + 75
          // }
          if (leftCoolBuffer === 0) {
            if (leftCoolDown.heat > 0) {
              leftCoolDown.heat -= 5
              leftCoolBuffer = 33
            }
          } else {
            leftCoolBuffer - 1
          }
          if (rightCoolBuffer === 0) {
            if (rightCoolDown.heat > 0) {
              rightCoolDown.heat -= 5
              rightCoolBuffer = 33
            }
          } else {
            rightCoolBuffer - 1
          }

          rightButton.on('click', () => {
            if (buffer + 33 < frames) {
              if (rightCoolDown.heat < 90) {
                enemyHealth -= rightAttack
                rightCoolDown.heat += rightAttack
                buffer = frames
              }
            }
          })
          rightButton.on('touchend', () => {
            if (buffer + 33 < frames) {
              if (rightCoolDown.heat < 90) {
                enemyHealth -= rightAttack
                rightCoolDown.heat += rightAttack
                buffer = frames
              }
            }
          })
          leftButton.on('click', () => {
            if (buffer + 33 < frames) {
              if (rightCoolDown.heat < 90) {
                enemyHealth -= leftAttack
                leftCoolDown.heat += leftAttack
                buffer = frames
              }
            }
          })
          leftButton.on('touchend', () => {
            if (buffer + 33 < frames) {
              if (rightCoolDown.heat < 90) {
                enemyHealth -= leftAttack
                leftCoolDown.heat += leftAttack
                buffer = frames
              }
            }
          })

          frames += 1
          console.log(playerHealth, enemyHealth, buffer, frames)
        }

        // End PIXI Render Setup
        // game functions
      } else {
        // const part = new PIXI.Sprite.fromImage(incoming.imgUrl)
        app.stage.addChild(incomingMech)
        incomingMech.x = app.screen.width / 2
        incomingMech.y = app.screen.height / 2
        incomingMech.interactive = true
        incomingMech.buttonMode = true
        incomingMech.on('click', () => {
          this.props.addPart(incoming)
        })
        incomingMech.on('touchend', () => {
          this.props.addPart(incoming)
        })
      }

      // TEXT
      // let attackText = new PIXI.Text(`DMG:${attack}`, {
      //   fontFamily: 'Arial',
      //   fontSize: 36
      // })
      // let defenseText = new PIXI.Text(`DEF:${defense}`, {
      //   fontFamily: 'Arial',
      //   fontSize: 36
      // })
      // let levelText = new PIXI.Text(`LVL:${level}`, {
      //   fontFamily: 'Arial',
      //   fontSize: 36
      // })
      // app.stage.addChild(defenseText)
      // app.stage.addChild(attackText)
      // app.stage.addChild(levelText)
      // defenseText.y = 50
      // levelText.y = 100
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
    async addPart (part) {
      dispatch(addPart(part))
    }
  }
}

const ConnectedBattle = connect(
  mapState,
  mapDispatch
)(Battle)
export default ConnectedBattle
