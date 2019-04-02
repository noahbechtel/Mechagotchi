const Sequelize = require('sequelize')
const db = require('../db')

const Mech = db.define('mech', {
  level: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Mech
