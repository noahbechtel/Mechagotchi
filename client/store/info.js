import history from '../history'
import axios from 'axios'

const GET_CODE = 'GET_CODE'
const GET_PIXI = 'GET_PIXI'
const GET_STOCK = 'GET_STOCK'

const getCode = code => ({ type: GET_CODE, code })
const getPixi = pixi => ({ type: GET_PIXI, pixi })
const getStock = stock => ({ type: GET_STOCK, stock })

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
export const fetchStock = () => async dispatch => {
  try {
    const { data } = await axios.get(`api/inventory`)
    dispatch(getStock(data))
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
    case GET_STOCK:
      return { stock: action.stock, ...state }

    default:
      return state
  }
}
