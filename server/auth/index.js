const router = require('express').Router()
const User = require('../db/models/user')
const Mech = require('../db/models/mech')
const Base = require('../db/models/base')
const rightWeapon = require('../db/models/rightWeapon')
const leftWeapon = require('../db/models/leftWeapon')
const Armor = require('../db/models/armor')
const Inventory = require('../db/models/inventory')

module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    let user = await User.findOne({
      where: { email: req.body.email },
      include: { model: Mech }
    })

    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const newMech = await Mech.create({
      level: 0,
      baseId: 1,
      rightWeaponId: 1,
      leftWeaponId: 1,
      armorId: 1
    })
    const mech = await Mech.findByPk(newMech.id, {
      include: [
        { model: Base },
        { model: rightWeapon },
        { model: leftWeapon },
        { model: Armor }
      ]
    })
    const inv = await Inventory.create({})
    const myFirstMech = Base.findByPk(1)
    const myFirstChaingun = rightWeapon.findByPk(1)
    const mySecondChaingun = leftWeapon.findByPk(1)
    await inv.addBase(myFirstMech)
    await inv.addRightWeapon(myFirstChaingun)
    await inv.addLeftWeapon(mySecondChaingun)
    const base = await inv.getBases()
    const armor = await inv.getArmors()
    const right = await inv.getRightWeapons()
    const left = await inv.getLeftWeapons()
    const inventory = { right, armor, base, left }
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
      mechId: mech.id,
      inventoryId: inv.id
    })
    const user = {
      email: newUser.email,
      id: newUser.id,
      inventoryId: newUser.inventoryId,
      mechId: newUser.mechId,
      googleId: newUser.googleId,
      mech,
      inventory
    }

    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', async (req, res) => {
  try {
    const mech = await Mech.findByPk(req.user.mechId, {
      include: [
        { model: Base },
        { model: rightWeapon },
        { model: leftWeapon },
        { model: Armor }
      ]
    })
    const inv = await Inventory.findByPk(req.user.inventoryId)
    const base = await inv.getBases()
    const armor = await inv.getArmors()
    const right = await inv.getRightWeapons()
    const left = await inv.getLeftWeapons()
    const inventory = { right, armor, base, left }
    const user = {
      email: req.user.email,
      id: req.user.id,
      inventoryId: req.user.inventoryId,
      mechId: req.user.mechId,
      googleId: req.user.googleId,
      mech,
      inventory
    }

    res.json(user)
  } catch (err) {
    console.log(err)
  }
})

router.use('/google', require('./google'))
