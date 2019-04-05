const router = require('express').Router()
const { Inventory } = require('../db/models')
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
