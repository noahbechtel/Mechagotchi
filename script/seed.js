'use strict'

const db = require('../server/db')
const {
  User,
  Mech,
  rightWeapon,
  leftWeapon,
  Armor,
  Base
} = require('../server/db/models')

async function seed () {
  await db.sync({ force: true })
  console.log('db synced!')
  const mechs = await Promise.all([
    // USERS
    User.create({ email: 'cody@email.com', password: '123', mechId: 1 }),
    User.create({ email: 'murphy@email.com', password: '123', mechId: 2 }),
    User.create({ email: 'noah', password: 'yeet', mechId: 2 }),
    //
    // PARTS
    //

    // BASES
    Base.create({
      class: 'Light Mech',
      name: 'Scout',
      rarity: 0,
      defense: 10,
      imgUrl: './assets/bases/Scout.png'
    }),
    Base.create({
      class: 'Medium Mech',
      name: 'Puma',
      rarity: 1,
      defense: 10,
      imgUrl: './assets/bases/Puma.png'
    }),

    // Weapons

    rightWeapon.create({
      name: 'Chaingun',
      damage: 15,
      rarity: 1,
      imgUrl: './assets/bases/Puma.png'
    }),
    rightWeapon.create({
      name: 'Gauss Rifle',
      damage: 50,
      rarity: 4,
      imgUrl: './assets/bases/Puma.png'
    }),
    leftWeapon.create({
      name: 'Chaingun',
      damage: 15,
      rarity: 1,
      imgUrl: './assets/bases/Puma.png'
    }),
    leftWeapon.create({
      name: 'Gauss Rifle',
      damage: 50,
      rarity: 4,
      imgUrl: './assets/bases/Puma.png'
    }),

    // Armor

    Armor.create({
      name: 'Scavenger Armor MkI',
      defense: 30,
      rarity: 1,
      imgUrl: './assets/bases/ScavMkI.png'
    }),
    Armor.create({
      name: 'Commander Armor Mk II',
      defense: 50,
      rarity: 4,
      imgUrl: './assets/bases/CommanderMkII.png'
    }),
    // Mechs
    Mech.create({
      baseId: 1,
      rightWeaponId: 1,
      leftWeaponId: 1,
      armorId: 1,
      level: 1
    }),
    Mech.create({
      baseId: 2,
      rightWeaponId: 1,
      leftWeaponId: 2,
      armorId: 1,
      level: 15
    }),
    Mech.create({
      baseId: 2,
      rightWeaponId: 2,
      leftWeaponId: 2,
      armorId: 2,
      level: 11
    })
  ])
  const users = await Promise.all([])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed () {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
