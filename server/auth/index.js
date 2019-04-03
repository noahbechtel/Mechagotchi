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
      include: [
        {
          model: Mech,
          attributes: ['id', 'level'],
          include: [
            { model: Base },
            { model: Armor },
            { model: rightWeapon },
            { model: leftWeapon }
          ]
        },
        { model: Inventory }
      ]
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
    const mech = await Mech.create({
      level: 0,
      baseId: 1,
      rightWeaponId: 1,
      leftWeaponId: 1,
      armorId: 1
    })
    const inv = Inventory.create({})
    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
      mechId: mech.id,
      inventoryId: inv.id
    })
    req.login(user, err => (err ? next(err) : res.json({ user })))
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
  const inv = await Inventory.findById(req.user.inventoryId)

  const mech = await Mech.findById(req.user.mechId, {
    attributes: ['id', 'level'],
    include: [
      { model: Base },
      { model: Armor },
      { model: rightWeapon },
      { model: leftWeapon }
    ]
  })

  const right = await inv.getBases()
  const armor = await inv.getArmors()
  const base = await inv.getRightWeapons()
  const left = await inv.getLeftWeapons()
  const inventory = { right, armor, base, left }

  res.json({
    email: req.user.email,
    id: req.user.id,
    mechId: req.user.mechId,
    googleId: req.user.googleId,
    mech,
    inventory
  })
})

router.use('/google', require('./google'))
