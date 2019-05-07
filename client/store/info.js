import history from '../history'
import axios from 'axios'
import spawnAlgo from '../utils.js/spawn'
import { me, additionalPart } from './user'

const GET_CODE = 'GET_CODE'
const GET_PIXI = 'GET_PIXI'
const GET_STOCK = 'GET_STOCK'

const getCode = code => ({ type: GET_CODE, code })
const getStock = stock => ({ type: GET_STOCK, stock })

export const setCode = code => async dispatch => {
  try {
    console.log(code)
    const mechSkele = spawnAlgo(String(code.result), code.stock)
    const { data } = await axios.post('api/mech/builder', mechSkele)
    console.log(data)
    dispatch(getCode(data))
    history.push('/battle')
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
      return { ...state, code: action.code }
    case GET_PIXI:
      return { ...state, pixi: action.pixi }
    case GET_STOCK:
      return { ...state, stock: action.stock }

    default:
      return state
  }
}
