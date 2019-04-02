const Sequelize = require('sequelize')
const db = require('../db')

const rightWeapon = db.define('rightWeapon', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  damage: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  rarity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  imgUrl: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = rightWeapon
