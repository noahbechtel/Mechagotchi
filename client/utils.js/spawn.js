const spawnAlgo = (code, stock) => {
  let type
  let digit = ('' + Number(code)).split('')
  if (digit.length < 6) {
    return 'too short'
  }
  digit[4] >= 7
    ? (type = 'base')
    : digit[4] > 4
      ? (type = 'leftWeapon')
      : digit[4] > 2
        ? (type = 'rightWeapon')
        : (type = 'armor')

  const stocknum = stock[type]
  let id = 1
  for (let i = 0; i <= Number(digit[5] + digit[5]); i++) {
    id++
    if (id > stocknum) {
      id = 1
    }
  }
  // console.log(Number(digit[3] + digit[4]))

  if (type === 'base') {
    let rightWeapon = 1
    for (let i = 0; i <= Number(digit[3] + digit[4]); i++) {
      rightWeapon++
      if (rightWeapon > stock.rightWeapon) {
        rightWeapon = 1
      }
    }

    let leftWeapon = 1
    for (let i = 0; i <= Number(digit[2] + digit[3]); i++) {
      leftWeapon++
      if (leftWeapon > stock.leftWeapon) {
        leftWeapon = 1
      }
    }
    let armor = 1
    for (let i = 0; i <= Number(digit[4] + digit[5]); i++) {
      armor++
      if (armor > stock.armor) {
        armor = 1
      }
    }
    return { type, base: id, rightWeapon, leftWeapon, armor, leftWeapon }
  } else return { type, id }
}
export default spawnAlgo
// enemy or item
// rarity 1-5
// id
// part type
