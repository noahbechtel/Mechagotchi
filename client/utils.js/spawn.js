const spawnAlgo = (code, stock) => {
  let item = {}
  let digit = ('' + code).split('')

  digit[3] > 8
    ? (item.type = 'base')
    : digit[3] > 5
      ? (item.type = 'leftWeapon')
      : digit[3] > 3
        ? (item.type = 'rightWeapon')
        : (item.type = 'armor')

  const stockNum = stock[item.type]
  item.id = Math.round(stockNum / digit[3] + Number(digit[3 + 1]))
  if (item.type === 'base') {
    item.rightWeaponId = Math.round(stockNum / digit[2 + 1] + Number(digit[1]))
    item.leftWeapon = Math.round(stockNum / digit[1 + 1] + Number(digit[2]))
    item.armor = Math.round(stockNum / digit[3 + 1] + Number(digit[4]))
  }
}
// enemy or item
// rarity 1-5
// id
// part type
