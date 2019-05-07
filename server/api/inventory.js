const router = require('express').Router()
const {
  Inventory,
  Base,
  leftWeapon,
  Armor,
  rightWeapon
} = require('../db/models')
module.exports = router

router.get('/me', async (req, res, next) => {
  try {
    const inv = await Inventory.findById(req.user.inventoryId)
    const base = await inv.getBases()
    const armor = await inv.getArmors()
    const right = await inv.getRightWeapons()
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
    next(error)
  }
})

router.post('/armor/:id', async (req, res, next) => {
  try {
    const inv = await Inventory.findById(req.user.inventoryId)
    const newArmor = await Armor.findById(req.params.id)
    await inv.addArmor(newArmor)
    const base = await inv.getBases()
    const armor = await inv.getArmors()
    const right = await inv.getRightWeapons()
    const left = await inv.getLeftWeapons()
    const inventory = { right, armor, base, left }
    res.json(inventory)
  } catch (error) {
    next(error)
  }
})
router.post('/base/:id', async (req, res, next) => {
  try {
    const inv = await Inventory.findByPk(req.user.inventoryId)
    const newBase = await Base.findByPk(req.params.id)
    await inv.addBase(newBase)
    const base = await inv.getBases()
    const armor = await inv.getArmors()
    const right = await inv.getRightWeapons()
    const left = await inv.getLeftWeapons()
    const inventory = { right, armor, base, left }
    res.json(inventory)
  } catch (error) {
    next(error)
  }
})
router.post('/leftWeapon/:id', async (req, res, next) => {
  try {
    const inv = await Inventory.findByPk(req.user.inventoryId)
    const newLeft = await leftWeapon.findByPk(req.params.id)
    await inv.addLeftWeapon(newLeft)
    const base = await inv.getBases()
    const armor = await inv.getArmors()
    const right = await inv.getRightWeapons()
    const left = await inv.getLeftWeapons()
    const inventory = { right, armor, base, left }
    res.json(inventory)
  } catch (error) {
    next(error)
  }
})
router.post('/rightWeapon/:id', async (req, res, next) => {
  try {
    const inv = await Inventory.findById(req.user.inventoryId)
    const newRight = await rightWeapon.findById(req.params.id)
    await inv.addRightWeapon(newRight)
    const base = await inv.getBases()
    const armor = await inv.getArmors()
    const right = await inv.getRightWeapons()
    const left = await inv.getLeftWeapons()
    const inventory = { right, armor, base, left }
    res.json(inventory)
  } catch (error) {
    next(error)
  }
})
