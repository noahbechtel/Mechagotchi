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
    const defense = mech.base.defense + mech.armor.defense
    const attack = mech.leftWeapon.damage + mech.rightWeapon.damage
    const level = mech.level
    const incoming = this.props.incoming
    console.log(incoming)
    // Setup

    let app = new PIXI.Application({
      width: window.screen.availWidth, // default: 800
      height: window.screen.availHeight * 0.7, // default: 600
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
      let incomingMech
      let right, left, ar, bs
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
        case 'base':
          if (incoming.armor.imgUrl !== mech.armor.imgUrl) {
            ar = new PIXI.Sprite.fromImage(incoming.imgUrl)
          } else {
            ar = new PIXI.Sprite(
              PIXI.loader.resources[mech.armor.imgUrl].texture
            )
          }
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

      //   app.stage.addChild(armor)
      if (incoming.base) {
        app.stage.addChild(base)
        app.stage.addChild(leftWeapon)
        app.stage.addChild(rightWeapon)
        base.x = window.screen.availWidth * 0.07
        base.y = 150
        leftWeapon.anchor.set(0.5, 1)
        leftWeapon.x = base.x + mech.base.rightArm_X
        leftWeapon.scale.x = -1
        leftWeapon.y = base.y + mech.base.rightArm_Y
        rightWeapon.anchor.set(1, 0.5)
        rightWeapon.x = base.x + mech.base.leftArm_X
        rightWeapon.y = base.y + mech.base.leftArm_Y
        base.tint = 0x000000
        rightWeapon.tint = 0x000000
        leftWeapon.tint = 0x000000
        app.stage.addChild(incomingMech.base)
        app.stage.addChild(incomingMech.leftWeapon)
        app.stage.addChild(incomingMech.rightWeapon)
        incomingMech.base.x = window.screen.availWidth * 0.25
        incomingMech.base.y = 50
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
        let playerAtk = mech.rightWeapon.damage + mech.leftWeapon.damage
        let enemyHealth = incoming.base.defense + 100
        let enemyAtk = incoming.rightWeapon.damage + incoming.leftWeapon.damage
        const fight = new PIXI.Sprite.fromImage('./assets/format/start.png')
        fight.scale.set(0.1)
        fight.interactive = true
        fight.buttonMode = true
        const playerHp = new PIXI.Text(`Health:${playerHealth}`, {
          fontFamily: 'Arial',
          fontSize: 36
        })
        const enemyHp = new PIXI.Text(`Health:${enemyHealth}`, {
          fontFamily: 'Arial',
          fontSize: 36
        })

        app.stage.addChild(fight)
        app.stage.addChild(enemyHp)
        app.stage.addChild(playerHp)
        fight.x = window.screen.availWidth * 0.12
        fight.y = 150
        enemyHp.y = incomingMech.base.y + 15
        enemyHp.x = incomingMech.base.x + 100
        playerHp.y = mech.base.y + 15
        playerHp.x = mech.base.x + 50

        const onClick = () => {
          console.log(enemyAtk, enemyHealth, playerAtk, playerHealth)
          if (playerHealth > 0) {
            enemyHealth = enemyHealth - playerAtk
            if (enemyHealth < 0) {
              console.log('dead!')
              app.stage.removeChild(incomingMech.base),
              app.stage.removeChild(incomingMech.rightWeapon),
              app.stage.removeChild(incomingMech.leftWeapon)
              this.props.addPart({ id: incoming.base.id, type: 'base' })
              const winner = new PIXI.Text(`You Won`, {
                fontFamily: 'Arial',
                fontSize: 36
              })
              app.stage.addChild(winner)
              winner.x = window.screen.availWidth * 0.07
              winner.y = 150
              winner.on('click', () => {
                this.props.history.push('/hanger')
              })

              return
            }
            console.log('still alive!')
            sleep(10)
            playerHealth = playerHealth - enemyAtk
          } else {
            const youDied = new PIXI.Text(`You Died`, {
              fontFamily: 'Arial',
              fontSize: 36
            })
            for (var i = app.stage.children.length - 1; i >= 0; i--) {
              app.stage.removeChild(stage.children[i])
            }
            app.stage.addChild(YouDied)
            youDied.x = window.screen.availWidth * 0.07
            youDied.y = 150
            youDied.interactive = true
            youDied.buttonMode = true
            youDied.on('click', () => {
              this.props.history.push('/hanger')
            })
          }
        }
        fight.on('click', onClick)

        const sleep = miliseconds => {
          var currentTime = new Date().getTime()

          while (currentTime + miliseconds >= new Date().getTime()) {}
        }
      } else {
        this.props.addPart(incoming)
        app.stage.addChild(incomingMech)
        incomingMech.x = 200
        incomingMech.y = 200
      }

      // TEXT
      let attackText = new PIXI.Text(`DMG:${attack}`, {
        fontFamily: 'Arial',
        fontSize: 36
      })
      let defenseText = new PIXI.Text(`DEF:${defense}`, {
        fontFamily: 'Arial',
        fontSize: 36
      })
      let levelText = new PIXI.Text(`LVL:${level}`, {
        fontFamily: 'Arial',
        fontSize: 36
      })
      app.stage.addChild(defenseText)
      app.stage.addChild(attackText)
      app.stage.addChild(levelText)
      defenseText.y = 50
      levelText.y = 100
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
