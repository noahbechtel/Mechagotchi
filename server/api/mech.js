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

router.get('/', async (req, res, next) => {
  try {
    const mech = await Mech.findById(req.user.mechId, {
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

router.put('/:id', async (req, res, next) => {
  try {
    const { baseId, leftWeaponId, rightWeaponId, armorId } = req.body
    const oldMech = await Mech.findById(req.params.id)
    const newMech = await oldMech.update({
      baseId,
      leftWeaponId,
      rightWeaponId,
      armorId
    })
    const returnedMech = await Mech.findById(newMech.id, {
      attributes: ['id', 'level'],
      include: [
        { model: Base },
        { model: Armor },
        { model: rightWeapon },
        { model: leftWeapon }
      ]
    })

    res.json(returnedMech)
  } catch (error) {}
})
