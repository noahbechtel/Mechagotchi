import axios from 'axios'

const GET_MECH = 'GET_MECH'

export const setMech = mech => ({ type: GET_MECH, mech })

export const updateMech = mech => async dispatch => {
  try {
    console.log(mech)
    const { data } = await axios.put(`api/mech/${mech.id}`, mech)
    console.log('UPDATED MECH DATA', data)
    dispatch(setMech(data))
  } catch (err) {
    console.error(err)
  }
}
export const fetchMech = id => async dispatch => {
  try {
    const { data } = await axios.get(`api/mech`)
    dispatch(setMech(data))
  } catch (err) {
    console.error(err)
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
