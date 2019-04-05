import React, { Component } from 'react'
import { connect } from 'react-redux'

class Armory extends Component {
  constructor () {
    super()
    this.state = { inv: {} }
  }
  componentDidMount () {
    this.setState({ inv: this.props.inv })
  }
}
const mapState = state => {
  return {
    mech: state.user.mech,
    user: state.user,
    inv: state.user.inventory
  }
}
const mapDispatch = dispatch => {
  return {
    setPixi () {
      dispatch(setPixi())
    }
  }
}

const ConnectedHanger = connect(
  mapState,
  mapDispatch
)(Hanger)
export default ConnectedHanger
