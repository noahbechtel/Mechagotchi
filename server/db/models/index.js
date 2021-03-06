const User = require('./user')
const Mech = require('./mech')
const rightWeapon = require('./rightWeapon')
const leftWeapon = require('./leftWeapon')
const Armor = require('./armor')
const Base = require('./base')
const Inventory = require('./inventory')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
Mech.belongsTo(Base)
Mech.hasOne(User)
User.belongsTo(Mech)
Mech.belongsTo(rightWeapon)
Mech.belongsTo(leftWeapon)
User.belongsTo(Inventory)
Mech.belongsTo(Armor)

Inventory.belongsToMany(rightWeapon, { through: 'rightItem' })
Inventory.belongsToMany(leftWeapon, { through: 'leftItem' })
Inventory.belongsToMany(Armor, { through: 'armorItem' })
Inventory.belongsToMany(Base, { through: 'baseItem' })

leftWeapon.belongsToMany(Inventory, { through: 'leftItem' })
rightWeapon.belongsToMany(Inventory, { through: 'rightItem' })
Base.belongsToMany(Inventory, { through: 'baseItem' })
Armor.belongsToMany(Inventory, { through: 'armorItem' })

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Mech,
  Base,
  rightWeapon,
  leftWeapon,
  Armor,
  Inventory
}
