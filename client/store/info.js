import history from '../history'

const GET_CODE = 'GET_CODE'

const getCode = code => ({ type: GET_CODE, code })

export const setCode = code => async dispatch => {
  try {
    dispatch(getCode(code))
    history.push('/')
  } catch (err) {
    console.error(err)
  }
}
/**
 * REDUCER
 */
export default function (state = '', action) {
  switch (action.type) {
    case GET_CODE:
      return action.code
    default:
      return state
  }
}
