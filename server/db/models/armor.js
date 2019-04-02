const Sequelize = require('sequelize')
const db = require('../db')

const Armor = db.define('armor', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  defense: {
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

module.exports = Armor
