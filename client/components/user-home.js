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
  return (
    <div>
      <div className='hanger'>
        <img src='./mech-1.png' />
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
    email: state.user.email,
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
