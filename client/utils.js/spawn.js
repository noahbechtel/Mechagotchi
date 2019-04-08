const spawnAlgo = (code, stock) => {
  let type
  let digit = ('' + Number(code)).split('')
  if (digit.length < 6) {
    return 'too short'
  }
  digit[4] > 8
    ? (type = 'base')
    : digit[4] > 5
      ? (type = 'leftWeapon')
      : digit[4] > 3
        ? (type = 'rightWeapon')
        : (type = 'armor')

  const stockNum = stock[type]
  let id = Math.round(stockNum / (1 + Number(digit[5])))

  if (type === 'base') {
    let rightWeapon = Math.round(
      stock.rightWeapon / (digit[3] + Number(digit[2])) + 1
    )
    if (rightWeapon === 0) {
      rightWeapon = 1
    }
    let leftWeapon = Math.round(
      stock.leftWeapon / (digit[2] + Number(digit[3])) + 1
    )
    if (leftWeapon === 0) {
      leftWeapon = 1
    }
    let armor = Math.round(stock.armor / (digit[4] + Number(digit[5])) + 1)
    if (armor === 0) {
      armor = 1
    }
    return { type, base: id, rightWeapon, leftWeapon, armor, leftWeapon }
  } else {
    if (id === 0) {
      id = 1
    }
    return { type, id }
  }
}
export default spawnAlgo
// enemy or item
// rarity 1-5
// id
// part type
