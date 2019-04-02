const User = require('./user')
const Mech = require('./mech')
const rightWeapon = require('./rightWeapon')
const leftWeapon = require('./leftWeapon')
const Armor = require('./armor')
const Base = require('./base')

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

Mech.belongsTo(Armor)

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
  Armor
}
