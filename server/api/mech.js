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
    const mech = await Mech.findByPk(req.user.mechId, {
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

router.post('/builder', async (req, res, next) => {
  try {
    const skele = req.body
    // console.log(skele)

    switch (skele.type) {
      case 'armor':
        let a = await Armor.findByPk(skele.id)
        res.json({
          imgUrl: a.imgUrl,
          name: a.name,
          defense: a.defense,
          id: a.id,
          rarity: a.rarity,
          type: skele.type
        })
        break
      case 'rightWeapon':
        let r = await rightWeapon.findByPk(skele.id)
        res.json({
          imgUrl: r.imgUrl,
          name: r.name,
          defense: r.defense,
          id: r.id,
          rarity: r.rarity,
          type: skele.type
        })
        break
      case 'leftWeapon':
        let l = await leftWeapon.findByPk(skele.id)
        res.json({
          imgUrl: l.imgUrl,
          name: l.name,
          defense: l.defense,
          id: l.id,
          rarity: l.rarity,
          type: skele.type
        })
        break
      case 'base':
        let base = await Base.findByPk(skele.base)
        let right = await rightWeapon.findByPk(skele.rightWeapon)
        let left = await leftWeapon.findByPk(skele.leftWeapon)
        let armor = await Armor.findByPk(skele.armor)
        res.json({
          base,
          rightWeapon: right,
          leftWeapon: left,
          armor,
          type: skele.type
        })
        break
      default:
        break
    }
    // const mech = await Mech.findByPk(req.user.mechId, {
    //   attributes: ['id', 'level'],
    //   include: [
    //     { model: Base },
    //     { model: Armor },
    //     { model: rightWeapon },
    //     { model: leftWeapon }
    //   ]
    // })
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const { baseId, leftWeaponId, rightWeaponId, armorId } = req.body
    const oldMech = await Mech.findByPk(req.params.id)
    const newMech = await oldMech.update({
      baseId,
      leftWeaponId,
      rightWeaponId,
      armorId
    })
    const returnedMech = await Mech.findByPk(newMech.id, {
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
