import React from 'react'
import history from '../history'
import { connect } from 'react-redux'
import { updateMech } from '../store/mech'

const Tile = props => {
  const part = props.part

  const handleCLick = async () => {
    const {
      armorId,
      baseId,
      id,
      leftWeaponId,
      rightWeaponId,
      level
    } = props.mech
    let newMech
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
        await props.updateMech(newMech)
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
        await props.updateMech(newMech)
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
        await props.updateMech(newMech)
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
        await props.updateMech(newMech)
        break

      default:
        break
    }
  }
  return (
    <div
      className={
        history.location.pathname === '/left' &&
        props.mech.leftWeapon.id === props.part.id
          ? 'on'
          : history.location.pathname === '/right' &&
            props.mech.rightWeapon.id === props.part.id
            ? 'on'
            : history.location.pathname === '/base' &&
            props.mech.base.id === props.part.id
              ? 'bigTileOn'
              : history.location.pathname === '/armor' &&
            props.mech.armor.id === props.part.id
                ? 'on'
                : part.leftArm_X
                  ? 'bigTile'
                  : 'tile'
      }
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
