const Sequelize = require('sequelize')
const db = require('../db')

const Base = db.define('base', {
  class: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },

  rarity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  rightArm_X: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  rightArm_Y: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  leftArm_X: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  leftArm_Y: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  defense: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  imgUrl: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Base
