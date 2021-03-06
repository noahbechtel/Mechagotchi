import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Hanger from './hanger'
import { fetchStock } from '../store/info'
import { fetchMech } from '../store/mech'

class UserHome extends Component {
  constructor () {
    super()
    this.state = { mech: null }
  }
  componentDidMount () {
    this.props.fetchStock()
    this.props.fetchMech()
    this.setState({ mech: this.props.mech })
  }
  render () {
    const mech = this.state.mech
    return (
      <div>
        <div>
          {mech !== null ? (
            <div>
              <Hanger />
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    mech: state.info.mech,
    user: state.user,
    info: state.info
  }
}
const mapDispatch = dispatch => {
  return {
    fetchMech () {
      dispatch(fetchMech())
    },
    fetchStock () {
      dispatch(fetchStock())
    }
  }
}

export default connect(
  mapState,
  mapDispatch
)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}

{
  /* <div className='topHalf'>
                <div className='topHalf_stats'>
                  <p>Left Side:{mech.leftWeapon.name}</p>
                  <p>Damage:{mech.leftWeapon.damage}</p>
                </div>
                <div className='mechViewport'>
                  <img src={mech.base.imgUrl} />
                </div>
                <div className='mechViewportArms'>
                  <img src='./assets/weapons/MissilePodLeft.png' />

                  <img src='./assets/weapons/MissilePodLeft.png' />
                </div>
                <div className='topHalf_stats'>
                  <p>Right Side:{mech.rightWeapon.name}</p>
                  <p>Damage:{mech.rightWeapon.damage}</p>
                </div>
              </div> */
}
