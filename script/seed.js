'use strict'

const db = require('../server/db')
const {
  User,
  Mech,
  rightWeapon,
  leftWeapon,
  Armor,
  Base,
  Inventory
} = require('../server/db/models')

async function seed () {
  await db.sync({ force: true })
  console.log('db synced!')
  const inv1 = await Inventory.create()
  const armor1 = await Armor.create({
    name: 'Commander Armor Mk II',
    defense: 50,
    rarity: 4,
    imgUrl: './assets/bases/CommanderMkII.png'
  })
  const mechs = await Promise.all([
    Inventory.create(),
    Inventory.create(),
    Inventory.create(),
    //
    // PARTS
    //

    // BASES
    Base.create({
      class: 'Light Mech',
      name: 'Scout',
      rarity: 0,
      defense: 10,
      rightArm_X: 110,
      rightArm_Y: 40,
      leftArm_X: -10,
      leftArm_Y: 40,
      imgUrl: './assets/bases/Scout.png'
    }),
    Base.create({
      class: 'Medium Mech',
      name: 'Puma',
      rarity: 1,
      defense: 10,
      rightArm_X: 110,
      rightArm_Y: 40,
      leftArm_X: -10,
      leftArm_Y: 40,
      imgUrl: './assets/bases/Puma.png'
    }),

    // Weapons

    rightWeapon.create({
      name: 'Chaingun',
      damage: 15,
      rarity: 1,
      imgUrl: './assets/weapons/MissilePodLeft.png'
    }),
    rightWeapon.create({
      name: 'Gauss Rifle',
      damage: 50,
      rarity: 4,
      imgUrl: './assets/weapons/MissilePodLeft.png'
    }),
    leftWeapon.create({
      name: 'Chaingun',
      damage: 15,
      rarity: 1,
      imgUrl: './assets/weapons/MissilePodLeft.png'
    }),
    leftWeapon.create({
      name: 'Gauss Rifle',
      damage: 50,
      rarity: 4,
      imgUrl: './assets/weapons/MissilePodLeft.png'
    }),

    // Armor

    Armor.create({
      name: 'Scavenger Armor MkI',
      defense: 30,
      rarity: 1,
      imgUrl: './assets/bases/ScavMkI.png'
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
    }),
    // USERS
    User.create({
      email: 'cody@email.com',
      password: '123',
      mechId: 1,
      inventoryId: 1
    }),
    User.create({
      email: 'noah@email.com',
      password: 'yeet',
      mechId: 2,
      inventoryId: 2
    })
  ])
  await inv1.addArmor(armor1)

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
