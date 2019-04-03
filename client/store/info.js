import history from '../history'

const GET_CODE = 'GET_CODE'
const GET_PIXI = 'GET_PIXI'

const getCode = code => ({ type: GET_CODE, code })
const getPixi = pixi => ({ type: GET_PIXI, pixi })

export const setCode = code => async dispatch => {
  try {
    dispatch(getCode(code))
    history.push('/')
  } catch (err) {
    console.error(err)
  }
}
export const setPixi = () => async dispatch => {
  try {
    dispatch(getPixi(true))
  } catch (err) {
    console.error(err)
  }
}
/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case GET_CODE:
      return { code: action.code, ...state }
    case GET_PIXI:
      return { pixi: action.pixi, ...state }
    default:
      return state
  }
}
