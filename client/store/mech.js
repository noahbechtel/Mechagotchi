import axios from 'axios'
import history from '../history'

const GET_MECH = 'GET_MECH'

export const setMech = mech => ({ type: GET_MECH, mech })

export const updateMech = mech => async dispatch => {
  try {
    const { data } = await axios.put(`api/mech/${mech.id}`, mech)
    dispatch(setMech(data))
  } catch (err) {
    console.error(err)
  }
}
export const fetchMech = () => async dispatch => {
  try {
    const { data } = await axios.get(`api/mech`)
    dispatch(setMech(data))
  } catch (err) {
    if (history.location.pathname !== ('/login' || '/signup')) {
      history.push('/signup')
    }
  }
}

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case GET_MECH:
      return action.mech
    default:
      return state
  }
}
