import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

const Navbar = props => {
  return (
    <div>
      <nav>
        {props.isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to='/home'>Home</Link>
            <Link to='/scan'>Scan Code</Link>

            <h3>{props.info.code}</h3>
          </div>
        ) : (
          <div>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Sign Up</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    mech: state.user.mech,
    user: state.user,
    info: state.info
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

export default connect(
  mapState,
  mapDispatch
)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
