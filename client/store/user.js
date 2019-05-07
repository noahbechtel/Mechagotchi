import axios from 'axios'
import history from '../history'
import { fetchMech } from './mech'
import { fetchStock } from './info'
/**
 * ACTION TYPES
 */
// const GET_INV = 'GET_INV'
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const GET_INV = 'GET_INV'

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
const setInv = inventory => ({ type: GET_INV, inventory })
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
export const addPart = part => async dispatch => {
  try {
    const { data } = await axios.post(`api/inventory/${part.type}/${part.id}`)
    dispatch(setInv(data))
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
    console.log(res.data)
    await dispatch(getUser(res.data))
    await dispatch(fetchMech())
    history.push('/builder')
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

export const getInv = () => async dispatch => {
  try {
    const res = await axios.get(`api/inventory/me`)
    dispatch(setInv(res.data))
    console.log(res.data)
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return { ...action.user, ...state }
    case GET_INV:
      return { ...state, inventory: action.inventory }

    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
