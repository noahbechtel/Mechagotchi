import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export const UserHome = props => {
  let scanning = false
  const scan = () => {
    if (!scanning) {
      scanning = true
      props.history.push('/scan')
    } else {
      scanning = false
      props.history.push('/home')
    }
  }
  const mech = props.user.mech

  return (
    <div>
      <div className='hanger'>
        <img src={mech.base.imgUrl} />
      </div>
      <div className='hanger'>
        <p>{mech.base.name}</p>
        <p>{mech.level}</p>
      </div>

      <div className='hanger'>
        <button onClick={scan}>scan</button>
        <h3>{props.info}</h3>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    mech: state.user.mech,
    user: state.user,
    info: state.info
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
