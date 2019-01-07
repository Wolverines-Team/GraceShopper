'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'DavidRichy@email.com',
      password: 'RichyRich',
      cartId: 4,
      history: [5, 6],
      role: false,
      visits: 0,
      addresses: [
        // {
        //   street: '15 Margaret Ct',
        //   city: 'St. Peters',
        //   state: 'MO',
        //   zip: 63376,
        //   name: 'David Richy'
        // }
      ]
    }),
    User.create({
      email: 'ShanonSalas@email.com',
      password: '123',
      cartId: 1,
      history: [2, 3],
      role: false,
      visits: 12,
      addresses: [
        // {
        //   street: '13520 Rosedown Ct',
        //   city: 'Boonville',
        //   state: 'MO',
        //   zip: 65233,
        //   name: 'Shanon Salas'
        // }
      ]
    }),
    User.create({
      email: 'BenSari@email.com',
      password: 'I<3Dogs',
      cartId: 7,
      history: [8, 9],
      role: true,
      visits: 35,
      addresses: [
        {
          street: '13 West Meadow',
          city: 'St.Charles',
          state: 'Il',
          zip: 63376,
          name: 'Ben Sari'
        }
      ]
    }),
    User.create({
      email: 'DannyDevito@email.com',
      password: 'TrashMan',
      cartId: 10,
      history: [11, 12],
      role: false,
      visits: 22,
      addresses: [
        {
          street: '1330 E 53rd St',
          city: 'Chicago',
          state: 'Il',
          zip: 65201,
          name: 'Danny Devito'
        }
      ]
    }),
    User.create({
      email: 'DonnyDarko@email.com',
      password: 'RabbitFear',
      cartId: 13,
      history: [14, 15],
      role: false,
      visits: 66,
      addresses: [
        {
          street: '13 End St',
          city: 'Hartford',
          state: 'Ct',
          zip: 50291,
          name: 'Donny Darko'
        }
      ]
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
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
