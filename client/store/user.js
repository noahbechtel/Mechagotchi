import axios from 'axios'
import history from '../history'
import { setMech } from './info'
/**
 * ACTION TYPES
 */
const GET_MECH = 'GET_MECH'
// const GET_INV = 'GET_INV'
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
// const getInv = inv => ({ type: GET_INV, inv })
// export const setMech = mech => ({ type: GET_MECH, mech })
const getUser = user => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })
/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, { email, password })
  } catch (authError) {
    return dispatch(getUser({ error: authError }))
  }

  try {
    dispatch(getUser(res.data))
    // dispatch(setMech(res.data.mech))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

// export const setMech = id => async dispatch => {
//   try {
//     const res = await axios.get(`api/mech/${id}`)
//     dispatch(getMech(res.data))
//     console.log(res.data)
//   } catch (err) {
//     console.error(err)
//   }
// }
// export const setInv = id => async dispatch => {
//   try {
//     const res = await axios.get(`api/inventory/${id}`)
//     dispatch(getInv(res.data))
//     console.log(res.data)
//   } catch (err) {
//     console.error(err)
//   }
// }

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return { ...action.user, ...state }
    // case GET_MECH:
    //   return { mech: action.mech, ...state }
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
