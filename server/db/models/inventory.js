const Sequelize = require('sequelize')
const db = require('../db')

const Inventory = db.define('inventory', {})

module.exports = Inventory
