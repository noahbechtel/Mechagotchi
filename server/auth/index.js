const router = require('express').Router()
const User = require('../db/models/user')
const Mech = require('../db/models/mech')
const Base = require('../db/models/base')
const rightWeapon = require('../db/models/rightWeapon')
const leftWeapon = require('../db/models/leftWeapon')
const Armor = require('../db/models/armor')
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
        }
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
    const user = await User.create(req.body)
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
  const mech = await Mech.findById(req.user.mechId)
  console.log(mech.base)
  const user = {
    ...req.user,
    mech
  }
  res.json(user)
})

router.use('/google', require('./google'))
