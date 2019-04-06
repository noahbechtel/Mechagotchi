import React, { Component } from 'react'
import history from '../history'
import { connect } from 'react-redux'
import { updateMech } from '../store/mech'

const Tile = props => {
  const part = props.part

  const handleCLick = () => {
    console.log(part.id)
    const {
      armorId,
      baseId,
      id,
      leftWeaponId,
      rightWeaponId,
      level
    } = props.mech
    let newMech
    console.log(history.location.pathname)
    switch (history.location.pathname) {
      case '/left':
        newMech = {
          leftWeaponId: part.id,
          armorId,
          baseId,
          id,
          rightWeaponId,
          level
        }
        props.updateMech(newMech)
        break
      case '/right':
        newMech = {
          leftWeaponId,
          armorId,
          baseId,
          id,
          rightWeaponId: part.id,
          level
        }
        props.updateMech(newMech)
        break
      case '/armor':
        newMech = {
          leftWeaponId,
          armorId: part.id,
          baseId,
          id,
          rightWeaponId,
          level
        }
        props.updateMech(newMech)
        break
      case '/base':
        newMech = {
          leftWeaponId,
          armorId,
          baseId: part.id,
          id,
          rightWeaponId,
          level
        }
        props.updateMech(newMech)
        break

      default:
        break
    }
  }
  return (
    <div
      className={part.leftArm_X ? 'bigTile' : 'tile'}
      onClick={handleCLick}
      key={part.id}
    >
      <div
        className={
          part.rarity > 3
            ? 'legendary'
            : part.rarity === 3
              ? 'rare'
              : part.rarity === 2
                ? 'uncommon'
                : 'common'
        }
      >
        <img className='tileImg' src={part.imgUrl} />
        <h3>{part.name}</h3>
        <p>{part.class ? part.class : ''}</p>
        <h4>
          {part.damage ? `Attack: ${part.damage}` : `Defense: ${part.defense}`}
        </h4>
      </div>
    </div>
  )
}
const mapState = state => {
  return {
    mech: state.mech
  }
}
const mapDispatch = dispatch => {
  return {
    updateMech (m) {
      dispatch(updateMech(m))
    }
  }
}

const TileConnected = connect(
  mapState,
  mapDispatch
)(Tile)
export default TileConnected
