import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Camera from './camera'

export const UserHome = props => {
  const { mech } = props
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
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
