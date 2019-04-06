const router = require('express').Router()
const {
  Inventory,
  Base,
  leftWeapon,
  Armor,
  rightWeapon
} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const inv = await Inventory.findById(req.user.inventoryId)
    const right = await inv.getBases()
    const armor = await inv.getArmors()
    const base = await inv.getRightWeapons()
    const left = await inv.getLeftWeapons()
    const inventory = { right, armor, base, left }

    res.json(inventory)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    let stock = {}
    stock.base = await Base.count()
    stock.leftWeapon = await leftWeapon.count()
    stock.rightWeapon = await rightWeapon.count()
    stock.armor = await Armor.count()
    res.json(stock)
  } catch (error) {
    next(err)
  }
})
