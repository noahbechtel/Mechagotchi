const router = require('express').Router()
const {
  User,
  Mech,
  Base,
  Armor,
  rightWeapon,
  leftWeapon
} = require('../db/models')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const mech = await Mech.findById(req.params.id, {
      attributes: ['id', 'level'],
      include: [
        { model: Base },
        { model: Armor },
        { model: rightWeapon },
        { model: leftWeapon }
      ]
    })
    res.json(mech)
  } catch (err) {
    next(err)
  }
})
