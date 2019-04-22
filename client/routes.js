import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Login, Signup, UserHome } from './components'
import { me } from './store'
import Camera from './components/camera'
import Builder from './components/builder'
import Armory from './components/armory'
import Multiview from './components/multiview'
import { fetchMech } from './store/mech'
import { fetchStock } from './store/info'
import Battle from './components/battle'

/**
 * COMPONENT
 */
class Routes extends Component {
  async componentDidMount () {
    this.props.fetchStock()
    await this.props.loadInitialData()
    this.props.fetchMech()
  }

  render () {
    const { isLoggedIn } = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path='/hanger' component={UserHome} />
            <Route path='/builder' component={Builder} />
            <Route exact path='/scan' component={Camera} />
            <Route exact path='/armory' component={Armory} />
            <Route
              path='/left'
              component={() => {
                return <Multiview part={this.props.inv.left} />
              }}
            />
            <Route
              path='/base'
              component={() => {
                return <Multiview part={this.props.inv.base} />
              }}
            />
            <Route
              path='/right'
              component={() => {
                return <Multiview part={this.props.inv.right} />
              }}
            />
            <Route
              path='/armor'
              component={() => {
                return <Multiview part={this.props.inv.armor} />
              }}
            />
            <Route path='/battle' component={Battle} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    inv: state.user.inventory
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData () {
      dispatch(me())
    },
    fetchMech () {
      dispatch(fetchMech())
    },
    fetchStock () {
      dispatch(fetchStock())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Routes)
)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
