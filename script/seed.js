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
  // console.log('db synced!')
  const inv1 = await Inventory.create()

  const bases = await Promise.all([
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
      rightArm_X: 45,
      rightArm_Y: -45,
      leftArm_X: -100,
      leftArm_Y: -45,
      imgUrl: './assets/bases/Scout.png'
    }),
    Base.create({
      class: 'Medium Mech',
      name: 'Puma',
      rarity: 1,
      defense: 20,
      rightArm_X: 45,
      rightArm_Y: -40,
      leftArm_X: -100,
      leftArm_Y: -40,
      imgUrl: './assets/bases/Puma.png'
    }),
    Base.create({
      class: 'Medium Mech',
      name: 'Argon',
      rarity: 3,
      defense: 40,
      rightArm_X: 40,
      rightArm_Y: -60,
      leftArm_X: -95,
      leftArm_Y: -60,
      imgUrl: './assets/bases/Argon.png'
    }),
    Base.create({
      class: 'Heavy Mech',
      name: 'T4NK',
      rarity: 4,
      defense: 70,
      rightArm_X: 60,
      rightArm_Y: -45,
      leftArm_X: -115,
      leftArm_Y: -45,
      imgUrl: './assets/bases/T4NK.png'
    }),
    Base.create({
      class: 'Light Mech',
      name: 'Sentinal',
      rarity: 2,
      defense: 20,
      rightArm_X: 40,
      rightArm_Y: -55,
      leftArm_X: -95,
      leftArm_Y: -55,
      imgUrl: './assets/bases/Sentinal.png'
    }),
    Base.create({
      class: 'Medium Mech',
      name: 'Foreman',
      rarity: 2,
      defense: 30,
      rightArm_X: 45,
      rightArm_Y: -45,
      leftArm_X: -100,
      leftArm_Y: -45,
      imgUrl: './assets/bases/Foreman.png'
    }),
    Base.create({
      class: 'Medium Mech',
      name: 'DVA',
      rarity: 3,
      defense: 40,
      rightArm_X: 45,
      rightArm_Y: -45,
      leftArm_X: -100,
      leftArm_Y: -45,
      imgUrl: './assets/bases/DVA.png'
    })
  ])
  // Weapons

  const chainGunRight = await rightWeapon.create({
    name: 'Chaingun',
    damage: 15,
    rarity: 1,
    imgUrl: './assets/weapons/chaingun.png'
  })
  const gaussRight = await rightWeapon.create({
    name: 'Gauss Rifle',
    damage: 50,
    rarity: 4,
    imgUrl: './assets/weapons/gauss.png'
  })
  const empRight = await rightWeapon.create({
    name: 'Emp Chaingun',
    damage: 50,
    rarity: 4,
    imgUrl: './assets/weapons/Empchain.png'
  })
  const missilePodRight = await rightWeapon.create({
    name: 'Missile Pod',
    damage: 15,
    rarity: 1,
    imgUrl: './assets/weapons/MissilePodLeft.png'
  })

  const gaussLeft = await leftWeapon.create({
    name: 'Gauss Rifle',
    damage: 50,
    rarity: 4,
    imgUrl: './assets/weapons/gauss.png'
  })

  const missilePodLeft = await leftWeapon.create({
    name: 'Missile Pod',
    damage: 15,
    rarity: 2,
    imgUrl: './assets/weapons/MissilePodLeft.png'
  })
  const empLeft = await leftWeapon.create({
    name: 'Emp Chaingun',
    damage: 50,
    rarity: 4,
    imgUrl: './assets/weapons/Empchain.png'
  })

  const chaingunLeft = await leftWeapon.create({
    name: 'Chaingun',
    damage: 15,
    rarity: 1,
    imgUrl: './assets/weapons/chaingun.png'
  })

  // Armor

  const armor1 = await Armor.create({
    name: 'Scavenger Armor MkI',
    defense: 30,
    rarity: 1,
    imgUrl: './assets/armors/ScavMkI.png'
  })
  const mechs = await Promise.all([
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
      baseId: 3,
      rightWeaponId: 2,
      leftWeaponId: 2,
      armorId: 1,
      level: 11
    })
  ])
  const users = await Promise.all([
    // USERS
    User.create({
      email: 'cody@email.com',
      password: '123',
      mechId: 1,
      inventoryId: 2
    }),
    User.create({
      email: 'noah@email.com',
      password: 'yeet',
      mechId: 3,
      inventoryId: 1
    }),
    User.create({
      email: 'asher@email.com',
      password: 'yeet',
      mechId: 2,
      inventoryId: 3
    })
  ])
  // await inv1.addBase(bases)
  // await inv1.addRightWeapon(missilePodRight)
  await inv1.addLeftWeapon(empLeft)
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
